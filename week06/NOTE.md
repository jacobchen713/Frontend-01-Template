## week 06 总结

### 使用有限状态机处理字符串

#### 在一个字符串中，找到字母'a'

```javascript
function match(string) {
  for(let c of string) {
    if(c === 'a') {
      return true;
    } 
  }
  return false;
}
```

#### 在一个字符串中，找到字符'ab'

```javascript
function match(string) {
  let foundA = falase;
  for(let c of srting) {
    if(c === 'a') {
      foundA = true;
    } else if(foundA && c === 'b') {
      return true;
    } else {
      foundA = false;
    }
  }
  return false;
}
```

#### 在一个字符串，找到字符'abcdef'
```javascript
function(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;

  for(let c of string) {
    if(c === 'a') {
      foundA = true;
    } else if(foundA && c === 'b') {
      foundB = true;
    } else if(foundB && c === 'c') {
      foundC = true;
    } else if(foundC && c === 'd') {
      foundD = true;
    } else if(foundD && c === 'e') {
      foundE = true;
    } else if(foundE && c === 'f') {
      return true
    } else {
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }

  return false;
}
```

### 使用状态机，在一个字符串，找到字符'abcdef'

```javascript
function match(string) {
  let state = start;
  for(let c of string) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if(c === 'a') {
    return foundA;
  } else {
    return start;
  }
}

function end(c) {
  return end;
}

function foundA(c) {
  if(c === 'b') {
    return foundB;
  } else {
    return start(c);
  }
}

function foundB(c) {
  if(c === 'c') {
    return foundC;
  } else {
    return start(c);
  }
}

function foundC(c) {
  if(c === 'd') {
    return foundD;
  } else {
    return start(c);
  }
}

function foundD(c) {
  if(c === 'e') {
    return foundE;
  } else {
    return start(c);
  }
}

function foundE(c) {
  if(c === 'f') {
    return end;
  } else {
    return start(c);
  }
}
```

### 识别'abcabx'
```javascript
function match(string) {
  let state = start;
  for(let c of string) {
    state = state(c);
  }
  return state === end;
}

function start(c) {
  if(c === 'a') {
    return foundA;
  } else {
    return start;
  }
}

function end(c) {
  return end;
}

function foundA(c) {
  if(c === 'b') {
    return foundB;
  } else {
    return start(c);
  }
}

function foundB(c) {
  if(c === 'c') {
    return foundC;
  } else {
    return start(c);
  }
}

function foundC(c) {
  if(c === 'a') {
    return foundA2;
  } else {
    return start(c);
  }
}

function foundA2(c) {
  if(c === 'b') {
    return foundB2;
  } else {
    return start(c);
  }
}

function foundB2(c) {
  if(c === 'x') {
    return end;
  } else {
    // 
    return foundB(c);
  }
}

match('abcabcabx');
```