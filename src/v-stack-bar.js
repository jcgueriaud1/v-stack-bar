// Import the PolymerElement base class and html helper function
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-material-styles/color.js';
import '@vaadin/vaadin-material-styles/typography.js';
import { ThemableMixin } from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';
import { ElementMixin } from '@vaadin/vaadin-element-mixin/vaadin-element-mixin.js';

// Extend the PolymerElement base class
class VStackBar extends ElementMixin(ThemableMixin(PolymerElement))  {

  constructor() {
    // Always call super() first
    super();
    this.bars = [];
    this.descriptions = [];
    this.colors = ["var(--stack-color-1)","var(--stack-color-2)","var(--stack-color-3)","var(--stack-color-4)"];
    this.backgroundColors = ["var(--stack-background-color-1)","var(--stack-background-color-2)","var(--stack-background-color-3)","var(--stack-background-color-4)"];
  }

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses PolymerElement as a base class.
   */
  static get template() {
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
    <style>
    :host {
      --stack-background-color-1: hsl(214, 90%, 52%);
      --stack-background-color-2: hsl(214, 90%, 52%, 0.5);
      --stack-background-color-3: hsl(214, 90%, 52%, 0.1);
      --stack-background-color-4: white;
      --stack-color-1: #FFF;
      --stack-color-2: #FFF;
      --stack-color-3: hsl(214, 90%, 52%);
      --stack-color-4: hsl(214, 90%, 52%);
    }
    :host([theme~="lumo-primary"]) {
        --stack-background-color-1: var(--lumo-primary-color,  --stack-background-color-1);
        --stack-background-color-2: var(--lumo-primary-color-50pct,  hsl(214, 90%, 52%, 0.5));
        --stack-background-color-3: var(--lumo-primary-color-10pct,  hsl(214, 90%, 52%, 0.1));
        --stack-background-color-4: white;
        --stack-color-1: var(--lumo-primary-contrast-color,  hsl(214, 90%, 52%));
        --stack-color-2: var(--lumo-primary-contrast-color,  hsl(214, 90%, 52%, 0.5));
        --stack-color-3: var(--lumo-primary-text-color,  hsl(214, 90%, 52%));
        --stack-color-4: var(--lumo-primary-text-color,  hsl(214, 90%, 52%));
    }
    :host([theme~="lumo-error"]) {
        --stack-background-color-1: var(--lumo-error-color,  --stack-background-color-1);
        --stack-background-color-2: var(--lumo-error-color-50pct,  --stack-background-color-2);
        --stack-background-color-3: var(--lumo-error-color-10pct,  --stack-background-color-3);
        --stack-background-color-4: white;
        --stack-color-1: var(--lumo-error-contrast-color,  --stack-color-1);
        --stack-color-2: var(--lumo-error-contrast-color,  --stack-color-2);
        --stack-color-3: var(--lumo-error-text-color,  --stack-color-3);
        --stack-color-4: var(--lumo-error-text-color,  --stack-color-4);
    }
    :host([theme~="lumo-success"]) {
      --stack-background-color-1: var(--lumo-success-color,  --stack-background-color-1);
      --stack-background-color-2: var(--lumo-success-color-50pct,  --stack-background-color-2);
      --stack-background-color-3: var(--lumo-success-color-10pct,  --stack-background-color-3);
      --stack-background-color-4: white;
      --stack-color-1: var(--lumo-success-contrast-color,  --stack-color-1);
      --stack-color-2: var(--lumo-success-contrast-color,  --stack-color-2);
      --stack-color-3: var(--lumo-success-text-color,  --stack-color-3);
      --stack-color-4: var(--lumo-success-text-color,  --stack-color-4);
    }
    :host([theme~="lumo-shade"]) {
      --stack-background-color-1: var(--lumo-shade,  --stack-background-color-1);
      --stack-background-color-2: var(--lumo-shade-70pct,  --stack-background-color-2);
      --stack-background-color-3: var(--lumo-shade-40pct,  --stack-background-color-3);
      --stack-background-color-3: var(--lumo-shade-20pct,  --stack-background-color-4);
      --stack-color-1: var(--lumo-tint-90pct,  --stack-color-1);
      --stack-color-2: var(--lumo-tint-90pct,  --stack-color-2);
      --stack-color-3: var(--lumo-shade,  --stack-color-3);
      --stack-color-4: var(--lumo-shade,  --stack-color-4);
    }
    :host {
      width: 100%;
      display: flex;
      box-shadow: var(--lumo-box-shadow-m);
    }
    .bar:first-of-type  {
      border-radius: var(--lumo-border-radius) 0 0 var(--lumo-border-radius); 
    }
    
    .bar:last-of-type  {
      border-radius: 0 var(--lumo-border-radius) var(--lumo-border-radius) 0; 
    }
    .bar {
      flex-basis:0;
      transition: all .2s ease-in-out; 
    }
    .bar-content {
      padding: var(--lumo-space-s, 1rem);
    }
    .tooltip {
      display: none;
    }
    .bar:hover {
      padding-left: var(--lumo-space-s, 1rem);
      padding-right: var(--lumo-space-s, 1rem);
      font-size: 1.1em;
    }
    .bar:hover .tooltip {
      display: block;
      position: absolute;
      padding: var(--lumo-space-s, 1rem);
      margin: var(--lumo-space-s, 1rem);
      border-radius: var(--lumo-border-radius); 
      z-index:1;
      background-color: var(--lumo-shade-90pct, black);
      color: var(--lumo-tint-90pct, white);
      box-shadow: var(--lumo-box-shadow-m);
    }
    </style>
    <template is="dom-repeat" items="[[bars]]">
        <template is="dom-if" if="[[item]]">
            <div class="bar" style="color: {{_getColor(index)}};background-color: {{_getBackgroundColor(index)}};flex-grow:[[item]]"><div class="bar-content">[[item]]</div><template is="dom-if" if="{{_getDescription(index)}}"><div class="tooltip">{{_getDescription(index)}}</template></div></div>
        </template>
    </template>
    `;
  }
  _getColor(index) {
    return this.colors[index];
  }
  _getBackgroundColor(index) {
    return this.backgroundColors[index];
  }

  _getDescription(index) {
    return this.descriptions[index];
  }
  // properties getter
  static get properties() {
    return {
      bars: { type: Array },
      descriptions: { type: Array},
      colors: { type: Array},
      backgroundColors: { type: Array}
    };
  }


}
// Register the new element with the browser.
customElements.define('v-stack-bar', VStackBar);

