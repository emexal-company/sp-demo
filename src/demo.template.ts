import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { styleMap } from 'lit-html/directives/style-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { Demo } from './demo.component';

export default function template(this: Demo) {
  return html`
    <slot style="display: none;" @slotchange="${this.handleSlotChange}"></slot>
    <table style="width: 100%;">
      <tr>
        <td style="${styleMap({ width: this.width + 'px', minWidth: this.width + 'px',height: this.height + 'px', minHeight: this.height + 'px' })}">
          ${unsafeHTML(this.templateInnerHTML)}
        </td>
        <td>
            <pre style="${this.style}"><code id="code" class="language-html">${this.templateInnerHTML}</code></pre>
        </td>
      </tr>
    </table>
      `;
}