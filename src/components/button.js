import html from 'snabby';
import { Map, is } from 'immutable';
import { get, remove } from '../utils/map-registry';

customElements.define('jg-button', class JgButton extends HTMLElement {

  constructor() {
    super();
    this._shadow = this.attachShadow({mode: 'open'});
    this._container = this._shadow.appendChild(document.createElement('span'));
    this.props = get(this.getAttribute('props')) || Map({});
  }

  connectedCallback() {
    this.applyRender();
  }

  attributeChangedCallback(name, oldPropsId, propsId) {
    if (name === 'props') {
      const newProps = get(propsId) || Map({});
      if (!is(this.props, newProps)) {
        this.props = newProps;
        remove(oldPropsId);
        this.applyRender();
      }
    }
  }

  applyRender() {
    const newContainer = this.render();
    html.update(this._container, newContainer);
    this._container = newContainer;
  }

  static get observedAttributes() { return [ 'props' ]; }

  render() {
    return html`
      <div>
        <style>
          :host *:not(style) { all: initial }
          :host button {
            border: solid 1px;
            border-radius: 4px;
            cursor: pointer;
          }
          :host .size-small {
            padding: 3px;
            font-size: 12px;
          }
          :host .size-medium {
            padding: 4px;
            font-size: 14px;
          }
          :host .size-large {
            padding: 4px;
            font-size: 16px;
          }
          :host .intent-positive {
            background: lightgreen;
            color: darkslategray;
          }
          :host .intent-warning {
            background: orange;
            color: darkslategray;
          }
        </style>
        <button onclick="${this.props.get('b')}" class="size-${this.getAttribute('size')} intent-${this.getAttribute('intent')}">
          ${this.props.get('a')} ${typeof this.props.get('b')}
        </button>
      </div>
    `;
  }

});

// import {LitElement, html} from 'lit-element';
//
// export class JigiButton extends LitElement {
//
//   static get properties() {
//     return {
//       value: { type: Number }
//     };
//   }
//
//   render(){
//     return html`
//       <style>
//         :host {
//           all: initial; /* 1st rule so subsequent properties are reset. */
//         }
//       </style>
//       <button>${this.value}</button>
//     `;
//   }
// }
// customElements.define('jigi-button', JigiButton);

// const fragment = document.createDocumentFragment();
// const template = document.createElement('template');
// template.innerHTML = `
//   <style>
//     :host {
//       all: initial; /* 1st rule so subsequent properties are reset. */
//     }
//   </style>
//   test
//   <button>Value : <slot name="text" /></button>
// `;
// template.id = 'jigi-button';
// fragment.appendChild(template);
// document.body.appendChild(fragment);

