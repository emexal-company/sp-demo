import { customElement, property, query } from 'lit-element';

import { Base } from '@spectrum/sp-base';

import demoStyles from './demo.styles';
import template from './demo.template';

import Prism from "prismjs";

@customElement('sp-demo')
export class Demo extends Base {
  public static componentStyles = demoStyles;
  private renderCount: number = 0;

  @property({ type: String }) public width: string = '';
  @property({ type: String }) public height: string = '';
  @property({ type: String }) public style: string = '';
  @query('slot') protected slot!: HTMLElement;
  @property({ type: String }) protected templateInnerHTML: string = '';

  protected render() {
    return template.call(this);
  }

  protected updated() {
      Prism.highlightAllUnder(this.shadowRoot);
  }

  protected handleSlotChange() {
    if (!this.slot) {
      this.templateInnerHTML = '';
      return;
    }

    this.templateInnerHTML = this.slot.assignedNodes({ flatten: true })[0].innerHTML;
    this.templateInnerHTML = this.templateInnerHTML.replace(/([a-zA-Z]+)=""/g, (p0, p1) => p1);
    this.templateInnerHTML = this.templateInnerHTML.replace(/([a-zA-Z]+)="([a-zA-Z]+)"/g, (p0, p1, p2) => (p1 === p2) ? p1 : p0);
    this.templateInnerHTML = this.templateInnerHTML.replace(/([:;,])([^\/])/g, (p0, p1, p2) => (`${p1} ${p2}`));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sp-demo': Demo;
  }
}
