## week 03
### StringToNumber
```javascript
function converStringToNumber(string, scale = 10) {
  var chars = string.split('');
  var number = 0;
  var i = 0;
  while(i < chars.length && chars[i] !== '.') {
    number *= scale;
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  if(chars[i] === '.')
    i++;
  var fraction = 1;
  while(i < chars.length && chars[i] !== 'e' && chars[i] !== 'E') {
    fraction /= scale;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
    i++;
  }
  if(chars[i] === 'e' || chars[i] === 'E')
    i++;
  var exponent = 0;
  while(i < chars.length) {
    exponent *= 10;
    exponent += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }
  number = number * Math.pow(10, exponent);

  return number;
}
converStringToNumber('22.345e2') // 2234.5
```
