# week 09
## 动画与绘制

### animation
```CSS
@keyframes mykf {
  from {
    background: red;
  }
  to {
    background: yellow;
  }
}

div {
  animation: mykf 5s infinite
}
```
- animation-name 
- animation-duration 动画时长
- animation-timing-function 动画的时间曲线
- animation-delay 动画开始前的延迟
- animatin-interation-count 动画的播放次数
- animation-direction 动画的方向

### transition
- transition-property 要变化的属性
- transition-duration 要变化的时长
- transition-timing-function 时间曲线
- transition-delay 延迟

### cubic-bezier
> https://cubic-bezier.com/

- ease 变化程度先快后慢
- linear 线性变化
- ease-in 变化程度逐渐增强 适合“退出”型场景
- ease-out 变化程度逐渐减弱 适合“进入”型场景
- ease-in-out 变化程度先逐渐增强然后逐渐减弱


## XML与SGML

[DTD](https://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd)

`&nbsp` no-break space 不间断空格，不推荐使用`&nbsp`
可用以下代替
```html
<div style="white-space: pre-wrap;">你   好</div>
```
- quot " `&quot;`	\u0022
- amp	&	`&amp;`	\u0026
- lt	<	`&lt;`	\u003c
- gt	>	`&gt;`	\u003e

## Events
- `addEventListener`

事件处理函数不一定是函数，也可以是个具有`handleEvent`方法的对象。
```javascript
var o = {
  handleEvent: event => console.log(event)
}
document.body.addEventListener('keydown', o, false);
```

useCapture 捕获冒泡 
true 捕获
false 冒泡 

once：只执行一次

passive：承诺此事件监听不会调用preventDefault，这有助于性能

```html
<div id="a" style="width: 500px; height: 300px; background-color: pink;">
  <div id="b" style="width: 500px; height: 200px; background-color: aqua;"></div>
</div>
<script>
  let a = document.getElementById('a');
  let b = document.getElementById('b');
  a.addEventListener('click', function() {
    console.log('a捕获');
  }, true);
  a.addEventListener('click', function() {
    console.log('a冒泡');
  }, false);
  b.addEventListener('click', function() {
    console.log('b捕获');
  }, true);
  b.addEventListener('click', function() {
    console.log('b冒泡');
  }, false);
  // a捕获 b捕获 b冒泡 a冒泡
</script>
```
