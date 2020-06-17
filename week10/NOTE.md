# week 10

## Range API 
- var range = new Range()
- range.setStart(element, 9)
- range.setEnd(element, 4)
- var range = docuemnt.setSelection().getRangeAt(0)
---
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

```html
<div id="list">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
<div id="numlist-1">123456789</div>
<div id="numlist-2">123<span style="background-color: pink;">456789</span>01234567</div>
<script>
  let element = document.getElementById('list');

  function reverseChildren(element) {
    var l = element.children.length;
    while(l-- > 0) {
      console.log(element.children[l])
      element.appendChild(element.children[l])
    }
  }

  // 使用Range API实现reverse
  void function reverseChildrenByRange(element) {
    let range = new Range();
    range.selectNodeContents(element);
    let fragment = range.extractContents();
    let l = fragment.childNodes.length;
    while(l-- > 0) {
      fragment.appendChild(fragment.childNodes[l]);
    }
    element.appendChild(fragment);
  }(element)

  let ele1 = document.getElementById('numlist-1').childNodes[0];
  // 移除[3, 6)
  let range1 = new Range();
  range1.setStart(ele1, 3);
  range1.setEnd(ele1, 6);

  let ele2 = document.getElementById('numlist-2');
  let range2 = new Range();
  range2.setStart(ele2.childNodes[0], 3);
  range2.setEnd(ele2.childNodes[2], 3);
  // 如果截取span标签，会分成两个span标签
</script>
```

## CSSOM

## Rules
- document.styleSheets[0].cssRules
- document.styleSheets[0].insertRule("p {color: pink}", 0)
- document.styleSheets[0].removeRule(0)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style title="hello">
    a::before {
      color: red;
      content: 'hello';
    }
  </style>
  <link rel="stylesheet" title="xx" href="data:text/css,p%7Bcolor:blue%7D"></link>
</head>
<body>
  <a id="abc"> world</a>
  <script type="text/javascript">
    let ele = document.getElementById('abc');
    console.log(document.styleSheets)
    // 修改属性
    document.styleSheets[0].cssRules[0].style.color = 'lightgreen';

    // console.log(getComputedStyle(ele));
  </script>
</body>
</html>
```

## 窗口 API
窗口 API 用于操作浏览器窗口的位置、尺寸等
- moveTo(x, y) 窗口移动到屏幕的特定坐标
- moveBy(x, y) 窗口移动特定距离
- resizeTo(x, y) 改变窗口大小到特定尺寸
- resizeBy(x, y) 改变窗口大小特定尺寸
```javascript
let childWindow = window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100")
childWindow.moveBy(-50, -50);
childWindow.resizeBy(50, 50);
```

## 视口滚动API
可视区域（视口）滚动行为由window对象上的一组API控制
- scrollX / pageXOffset：X方向上的当前滚动距离；
- scrollY / pageYOffset：Y方向上的当前滚动距离；
- scroll(x, y) / scrollTo(x, y)：使得页面滚动到特定的位置，支持传入配置型参数 {top, left}；
- scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

## 元素滚动API
- element.scrollTop：滚动元素Y轴上当前滚动距离；
- element.scrollLeft：滚动元素X轴上当前滚动距离；
- element.scrollWidth：元素内部的滚动内容的宽度；
- element.scrollHeight：元素内部的滚动内容的高度；
- element.scroll(x, y) / scrollTo(x, y)：滚动到指定位置，支持传入配置型参数 {top, left}；
- element.scrollBy(x, y)：滚动指定距离，支持传入配置型参数 {top, left}；

## 布局API
### 尺寸信息
- window.innerWidth / window.innerHeight 视口的宽度/高度，可以从`document.documentElement.getBundingClientRect()`中获取；
- window.devicePixelRatio 表示物理像素和 CSS 像素单位的倍率关系，window.devicePixelRatio = 2，则1个CSS像素占4个物理像素