import './src/components/header/header'

const template = document.createElement('template')
template.innerHTML = `
<div class="app">
    <arl-header></arl-header>
</div>
`

export class App extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))
    }
}

customElements.define('arl-app', App)