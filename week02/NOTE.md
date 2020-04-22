## Week 02
### 写一个正则表达式 匹配所有 Number 直接量

***NumericLiteral ::***
- DecimalLiteral
- BinaryIntegerLiteral
- OctalIntegerLiteral
- HexIntegerLiteral
```javascript
/^(0|[1-9]\d*\.?\d*)|(\.\d+)((e|E)(-|\+)\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/
```

***DecimalLiteral ::***
- DecimalIntegerLiteral . DecimalDigits<sub>opt</sub> ExponentPart<sub>opt</sub>
- . DecimalDigits ExponentPart<sub>opt</sub>
- DecimalIntegerLiteral ExponentPart<sub>opt</sub>
```javascript
/^(0|[1-9]\d*\.?\d*)|(\.\d+)((e|E)(-|\+)\d+)?$/
```

***DecimalIntegerLiteral ::***
- 0
- NonZeroDigit DecimalDigits<sub>opt</sub>
```javascript
/^0|[1-9]\d*$/
```

***DecimalDigits ::***
- DecimalDigit
- DecimalDigits DecimalDigit 
```javascript
/^\d+$/
```

***DecimalDigit ::*** one of
- 0 1 2 3 4 5 6 7 8 9
```javascript
/^\d$/
```

***NonZeroDigit ::*** one of 
- 1 2 3 4 5 6 7 8 9
```javascript
/^[1-9]$/
```

***ExponentPart ::***
- ExponentIndicator SignedInteger
```
/^(e|E)(-|\+)\d+$/
```

***ExponentIndicator ::*** one of 
- e E
```
/^(e|E)$/
```

***SignedInteger ::***
- DecimalDigits
- \+ DecimalDigits 
- \- DecimalDigits
```
/^(-|\+)\d+$/
```

***BinaryIntegerLiteral ::***
- 0b BinaryDigits
- 0B BinaryDigits
```
/^0[bB][01]+$/
```

***BinaryDigits ::***
- BinaryDigit
- BinaryDigits BinaryDigit 
```
/^[01]+$/
```

***BinaryDigit ::*** one of
 - 0 1
```
/^[01]$/
```

***OctalIntegerLiteral ::***
- 0o OctalDigits
- 0O OctalDigits
``` javascript
/^0[oO][0-7]+$/
```

***OctalDigits ::***
- OctalDigit
- OctalDigits OctalDigit 
``` javascript
/^[0-7]+$/
```

***OctalDigit ::*** one of
- 0 1 2 3 4 5 6 7
``` javascript
/^[0-7]$/
```

***HexIntegerLiteral ::***
- 0x HexDigits
- 0X HexDigits
``` javascript
/^0[xX][0-9a-fA-F]+$/
```

***HexDigits ::***
- HexDigit
- HexDigits HexDigit
``` javascript
/^[0-9a-fA-F]+$/
```

***HexDigit ::*** one of
- 0 1 2 3 4 5 6 7 8 9 a b c d e f A B C D E F
``` javascript
/^[0-9a-fA-F]$/
```

### 写一个 UTF-8 Encoding 的函数
```javascript
function EncodingUTF8(text) {
  const uft8Str = encodeURIComponent(text);
  const uft8Arr = [];
  for (var i = 0; i < uft8Str.length; i++) {
    const c = uft8Str.charAt(i);
    if (c === '%') {
      const hex = uft8Str.charAt(i + 1) + uft8Str.charAt(i + 2);
      uft8Arr.push(hex);
      i += 2;
    } else {
      uft8Arr.push(c.charCodeAt(0).toString(16));
    }
  }
  console.log(`0x${uft8Arr.join()}`);
  return `0x${uft8Arr.join()}`;
}
```

### 总结
[Unicode](https://www.fileformat.info/info/unicode/index.htm)
Basic Latin U+0000 - U+0078 128位
CJK Unified Ideographs U+4E00 - U+9FFF 20989
BMP: 基本字符平面 四位十六进制表示 U+0000 - U+FFFF 0到65535
在`Javascript`中`String.fromCharCode() `只能获取`BMP`内的字符， 范围介于0到65535（0xFFFF）之间。 大于0xFFFF的数字将被截断， 不进行有效性检查。超过BMP可以使用`String.fromCodePoint()`;
```javascript
// String.fromCharCode(i) 获取码点`i`的字符
for(let i = 0; i < 128; i++) {
  console.log(String.fromCharCode(i));
  document.write(i + "<span style='background-color: lightgreen'>" + String.fromCharCode(i) + "</span>");
}
var 厉害 = 1;
console.log(厉害) // 输出1

// String.codePointAt() 获取字符的Unicode码点
"厉".codePointAt().toString(16); // 5389
"害".codePointAt().toString(16); // 5bb3

var \u5389\u5bb3 = 1;
```
```
InputElement
  WhiteSpace
  LineTerminator
  Comment
  Token

WhiteSpace:
  <TAB> '\t'.codePointAt().toString(16); // 9 制表符
  <VT> '\v'.codePointAt().toString(16); // 11 纵向向制表符
  <FE> 
  <SP>
  <NBSP> no break space '&nbsp'.codePointAt().toString(16); // 26
  <ZWNBSP> Zero width no-break space U+FEEE 
BOM Bit order mask

LineTerminator
  <LF> \n U+000A 换行
  <CR> \r U+000D 会回车

Token
  IdentifierNmae
    Keywords
    Identifier
      变量名
      属性(可以和关键字重合)
      class 关键字
      document.body.setAttribute("class", "a");
      document.body.className // a
      // 可以给document.body.class赋值
      document.body.class = 10;
    Future Reserved Keywords: enum
  Punctuator
  Keywords
  Literal()
```
```javascript
// Number 最佳实践
// Safe Integer 
Number.MAX_SAFE_IBTERGER.toString(16) // 1fffffffffffff

// FLoat Compare
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
Number.EPSILON // 2.220446049250313e-16
```