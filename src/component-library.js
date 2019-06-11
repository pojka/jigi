import html from 'snabby';
import { register } from './utils/map-registry';

import './components/button.js';

customElements.define('jg-component-library', class ComponentLibrary extends HTMLElement {

  constructor() {
    super();
    this._shadow = this.attachShadow({mode: 'open'});
    this._container = this._shadow.appendChild(document.createElement('span'));
  }

  connectedCallback() {
    this.applyRender();

    setInterval(() => {
      const now = Date.now();
      this._shadow.getElementById('something').setAttribute('props', register({ a: now, b: (function(){ console.log('oi 1') })()}));
      this._shadow.getElementById('something2').setAttribute('props', register({ a: now, b: (function(){ console.log('oi 2') })()}));
      this._shadow.getElementById('something3').setAttribute('props', register({ a: now, b: (function(){ console.log('oi 3') })()}));
      this._shadow.getElementById('something4').setAttribute('props', register({ a: now, b: (function(){ console.log('oi 4') })()}));
    }, 2000)
  }

  attributeChangedCallback(...stuff) {
    console.log(stuff);
    this.applyRender();
  }

  applyRender() {
    const newContainer = this.render();
    html.update(this._container, newContainer);
    this._container = newContainer;
  }

  render() {
    return html`
      <div>
        <style type="text/css">
          :host *:not(style) { all: initial }
        </style>
        Button
        <br />
        <jg-button id="something" size="small" intent="positive" value="0" props="${register({ a: 1, b: 2})}"></jg-button><br />
        <jg-button id="something2" size="medium" intent="positive" value="0" props="${register({ a: 3, b: 4})}"></jg-button><br />
        <jg-button id="something3" size="large" intent="positive" value="0" props="${register({ a: 5, b: 6})}"></jg-button><br />
        <jg-button id="something4" size="large" intent="warning" value="0" props="${register({ a: 7, b: 8})}"></jg-button><br />
        <br />
        <br />
        <div class="test">testing cl</div>
        <button class="button">testing cl</button>
      </div>
    `;
  }

});
