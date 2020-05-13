const net = require('net');

class Request {
  constructor(option) {
    this.method = option.method || 'GET';
    this.host = option.host;
    this.path = option.path || '/';
    this.port = option.port || '80';
    this.header = option.header || {};
    this.body = option.body || {};

    if (!this.header['Content-Type']) {
      this.header['Content-Type'] = 'application/x-www-from-urlencoded';
    }
    if (this.header['Content-Type'] === 'application/x-www-from-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => {
        return `${key}=${encodeURIComponent(this.body[key])}`
      }).join('&');
    } else if (this.header['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    }

    this.header['Content-Length'] = this.bodyText.length;
  }

  toString() {
    return [
      `${this.method} ${this.path} HTTP/1.1`,
      `${Object.entries(this.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n')}`,
      '',
      `${this.bodyText}`
    ].join('\r\n');
  }

  send(connection) {
    return new Promise((resolve, reject) => {
      let parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          { host: this.host, port: this.port },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on('data', (data) => {
        parser.receive(data.toString());
        resolve(parser.response);
        connection.end();
      });
      connection.on('err', (err) => {
        reject(err);
        connection.end();
      });
    });
  }
}

class Response {}

/**
 * 用状态机解析 Response
 */
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0; // 处理响应行
    this.WAITING_STATUS_LINE_END = 1; // 处理响应行的换行
    this.WAITING_HEADER_NAME = 2; // 处理响应头的名字
    this.WAITING_HEADER_SPACE = 3; // 处理响应头中间的空格
    this.WAITING_HEADER_VALUE = 4; // 处理响应头的值
    this.WAITING_HEADER_LINE_END = 5; // 处理响应头的换行
    this.WAITING_HEADER_BLOCK_END = 6; // 处理响应头与响应体之间的空行
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headerName = '';
    this.headerValue = '';
    this.header = {};
    this.body = {};
    this.bodyParser = null;
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      header: this.header,
      body: this.bodyParser.content.join(''),
    };
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE;
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END;
        this.header[this.headerName] = this.headerValue;
        this.headerName = '';
        this.headerValue = '';
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY;
        this.bodyParser = new TrunkedBodyParser();
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char);
    }
  }
}

class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;

    this.current = this.WAITING_LENGTH;
    this.length = 0;
    this.content = [];
    this.isFinished = false;
  }

  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if (char === '\r') {
        if (this.length === 0) {
          this.isFinished = true;
        }
        this.current = this.WAITING_LENGTH_LINE_END;
      } else {
        this.length *= 10;
        this.length = char.charCodeAt(0) - '0'.charCodeAt(0);
      }
    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if (char === '\n') {
        this.current = this.READING_TRUNK;
      }
    } else if (this.current === this.READING_TRUNK) {
      if (this.length === 0) {
        this.current = this.WAITING_NEW_LINE;
      } else {
        this.content.push(char);
        this.length--;
      }
    } else if (this.current === this.WAITING_NEW_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_NEW_LINE_END;
      }
    } else if (this.current === this.WAITING_NEW_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_LENGTH;
      }
    }
  }
}

void async function () {
  let request = new Request({
    host: '127.0.0.1',
    path: '/',
    port: 8088,
    method: 'GET',
    body: {
      name: 'chen',
    },
  });
  let response = await request.send();
  console.log(response);
}();
