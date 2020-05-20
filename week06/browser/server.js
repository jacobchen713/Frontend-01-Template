const http = require('http');

const server  = http.createServer((req, res) => {
  console.log('request received');
  console.log('X-Foo2', req.headers);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(
`<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>`);
});

server.listen(8088);

// var xhr = new XMLHttpRequest();
// xhr.open('get', 'http://127.0.0.1:8888', true);
// xhr.send(null);
