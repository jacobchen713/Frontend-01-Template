# week 13
## Proxy基本用法

```javascript
let object = {
  a: 1,
  b: 2
}

function reactive(obj) {
  return new Proxy(object, {
    get(obj, prop) {
      console.log(obj, prop);
      return obj[prop];
    },
    set(obj, prop, val) {
      console.log(obj, prop);
      return obj[prop] = val;
    }
  })
}

let proxy = reactive(object);
```

## 组件化： 组件的基本知识，轮播组件
### 对象与组件
1. 对象包含的内容
* Properties
* Methods
* Inherit
2. 组件包含的内容
* Properties
* Methods
* Inherit
* Attribute
* Config & State
* Event
* Lifecycle
* Children

### Component
### Attribute vs Property
* Attribute 强调描述性
```javascript
<my-component attribute='v' />
myComponent.getAttribute('a')
myComponent.setAttribute('a', 'value');
```

* Property 强调从属关系
```javascript
myComponent.a = 'value';
```

* Attribute vs Property
```html
<input value='cute'/>
<script>
var input = document.getElementByTagName('input'); // 若property 没有设置，则结果是attribute
input.value // cute
input.getAttribute('value');  // cute
input.value = 'hello';  // 若value属性已经设置，则 attribute 不变，property 变化，元素上实际的效果是 property 优先
input.value // hello
input.getAttribute('value');  // cute  
</script>
```