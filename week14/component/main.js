function createElement(Cls, attributes, ...children) {
  let o;
  if(typeof Cls === 'string') {
    o = new Wrapper(Cls);
  } else {
    o = new Cls({
      timer: {}
    });
  }

  for(let name in attributes) {
    o.setAttribute(name, attributes[name]);
  }

  for(let child of children) {
    if(typeof child === 'string') {
      child = new Text(child)
    }
    o.appendChild(child);
  }

  return o;
}

class Text {
  constructor(text) {
    this.children = [];
    this.root = document.createTextNode(text);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type)
  }

  setAttribute(name, val) { //attribute
    this.root.setAttribute(name, val);
  }

  appendChild(child) { //children
    // child.mountTo(this.root);
    this.children.push(child);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
    for(let child of this.children) {
      child.mountTo(this.root)
    }
  }
}

class MyComponent {
  constructor(config) {
    this.children = [];
    this.root = document.createElement('div')
  }

  setAttribute(name, val) { //attribute
    this.root.setAttribute(name, val);
  }

  appendChild(child) { //children
    this.children.push(child);
  }

  render() {
    
    return <article>
      <header>I'm a header</header>
      {this.slot}
      <footer>I'm a footer</footer>
    </article>
  }

  mountTo(parent) {
    // parent.appendChild(this.root);
    // for(let child of this.children) {
    //   child.mountTo(this.root)
    // }
    this.slot = <div></div>
    for(let child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent);
    
  }
}

// let component = <Div id="a" class="b">
//   <p></p>
//   <Div></Div>
//   <Div></Div>
// </Div>

let component = <MyComponent>
  <div>Hello world</div>
</MyComponent>

component.mountTo(document.body)
// console.log(component)
