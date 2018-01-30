(function() {
    "use strict";

    const template = `
        <style>
            
        </style>
        <div>
            A Button
        </div>
    `;

    class ButtonToggle extends HTMLElement {

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
        }

    }

    window.customElements.define('button-toggle', ButtonToggle);
})();

