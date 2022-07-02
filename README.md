# Memo

## Web Component Template

```js
/* Create template */
const template = document.createElement('template');
template.innerHTML = `
    <div>Hello World !</div>
`
class MyComponent extends HTMLElement {
     constructor() {
        super();

        /* Attach template to shadow DOM */
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true));
     }
}

/* Define tag */
customElements.define('arl-my-component', MyComponent);
```

In our HTML

```html
<body>
    <!-- Use our component -->
    <arl-my-component></arl-my-component>

     <!-- Import our component -->
    <script type="module" src="/myPath/my-component.ts"></script>
</body>
```

## How to test my web component ?

* How to load my component ?

```js
class MyComponent extends HTMLElement {}

const myComponent = new MyComponent();
```

* How to access to the rendering of my component ?

```js
// myComponent is a HTMLElement you can access to the DOM with classical js methods
myComponent.shadowRoot.querySelector(...)
```