## week 08

### CSS选择器

简单选择器
- *
- div 
- svg|a namespace命名空间
- .cls
- #id
- [attr=value]
- :hover
- ::before

复合选择器
- <简单选择器><简单选择器><简单选择器>
- *或者div必须写在最前面

复杂选择器
- 空格 子孙关系
- <复合选择器>'>'<复合选择器> 只能选择子一级
- <复合选择器>'~'<复合选择器> 
- <复合选择器>'+'<复合选择器> 
- <复合选择器>'||'<复合选择器> `h2 + p` 会匹配所有紧邻在`<h2>`元素后的`<p>`元素

#### 选择器优先级

#### 伪类

链接/行为
 
- :any-link 所有超链接
- :link 未访问
- :visited 已访问
- :hover 悬停
- :active <a>, <button>点击
- :focus 焦点
- :target

树结构

- :empty 没有子节点
- :nth-child() 父元素的第几个子元素
- :nth-last-child()
- :first-child :last-child :only-child

:nth-child() :last-child :only-child 在计算css时需要回溯

逻辑型

- :not()
- :where :has // Level 4

#### 伪元素

- ::before 
- ::after
```html
<div>
  <::before/>
  content content content
  content content content
  <::after/>
</div>
```
- ::first-letter
```html
<div>
  <::first-letter>c</::first-letter>ontent content content
  content content content
</div>
```

- ::first-line
```html
<div>
  <::first-line>content content content</::first-line>
  content content content
</div>
```
::first-line可用属性

font系列 color background word-spacing letter-spacing text-decoration text-transform

::first-letter可用属性

font color background word-spacing letter-spacing text-decoration text-transform line-height float vertical-align 盒模型系列(margin padding border)
