(function() {
    "use strict";

    const template = `
        <style>
            :host {
                display: inline-block;
            }
            :host div {
                display: inline-block;
                border-radius: 4px;
                border: 1px solid #999;
                color: #333;
                cursor: pointer;
                padding: 5px 10px;
                user-select: none;
            }
            :host([pressed]) div {
                border-color: #06A;
                background-color: #39F;
                color: #FFF;
            }
            :host([disabled]) div {
                cursor: not-allowed;
                background-color: #EEE;
                color: #AAA;
            }
            :host([pressed][disabled]) div {
                border-color: #467;
                background-color: #69C;
                color: #DDD;
            }
        </style>
        <div>
            <slot>
                A Button
            </slot>
        </div>
    `;

    class ButtonToggle extends HTMLElement {

        // A getter/setter for pressed property.
        get pressed() {
            return this.hasAttribute('pressed');
        }

        set pressed(value) {
            if (value) {
                this.setAttribute('pressed', 'pressed');
            } else {
                this.removeAttribute('pressed');
            }
        }

        // A getter/setter for pressed property.
        get disabled() {
            return this.hasAttribute('disabled');
        }

        set disabled(value) {
            if (value) {
                this.setAttribute('disabled', 'disabled');
            } else {
                this.removeAttribute('disabled');
            }
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            this.addEventListener('click', function() {
                if (!this.disabled) this.toggle();
            });
        }

        toggle() {
            this.pressed = !this.pressed;
        }
    }

    window.customElements.define('button-toggle', ButtonToggle);
})();

