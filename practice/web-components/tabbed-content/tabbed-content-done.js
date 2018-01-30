(function() {
    "use strict";

    const template = `
        <style>
            #tabs {
                display: block;
                background-color: var(--tabbed-content-color, #8AC);
                padding: 5px 5px 0 5px;
            }
            #tab::slotted(*) {
                display: inline-block;
                cursor: pointer;
                border-radius: 4px 4px 0 0;
                background-color: rgba(0, 0, 0, .25);
                padding: 5px 10px;
                color: #FFF;
                margin-right: 3px;
                font-size: 120%;
            }
            #tab::slotted([selected]) {
                background-color: #FFF;
                color: black;
            }
            
            #contents {
                display: block;
                border: 1px solid var(--tabbed-content-color, #8AC);
                border-top: none;
                min-height: 100px;
                padding: 10px;
            }
            #content::slotted(*) {
                display: none;
            }
            #content::slotted([selected]) {
                display: block;
            }
        </style>
        <div id="tabs">
            <slot id="tab" name="tab"></slot>  
        </div>
        <div id="contents">
            <slot id="content" name="content"></slot>  
        </div>
    `;

    class TabbedContent extends HTMLElement {

        static get observedAttributes() {
            return ['index'];
        }

        get index() {
            return this.hasAttribute('index') ?
                parseInt(this.getAttribute('index')) :
                -1;
        }

        set index(value) {
            this.setAttribute('index', value);

            const tabs = this.querySelectorAll('[slot="tab"]');
            for (let i = 0; i < tabs.length; i++) {
                if (value === i) {
                    tabs[i].setAttribute('selected', '');
                } else {
                    tabs[i].removeAttribute('selected');
                }
            }

            const contents = this.querySelectorAll('[slot="content"]');
            for (let i = 0; i < contents.length; i++) {
                if (value === i) {
                    contents[i].setAttribute('selected', '');
                } else {
                    contents[i].removeAttribute('selected');
                }
            }
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            this.addEventListener('click', function(e) {
                if (e.target.getAttribute('slot') === 'tab') {
                    const tabs = this.querySelectorAll('[slot="tab"]');
                    for (let i = 0; i < tabs.length; i++) {
                        if (tabs[i] === e.target) {
                            this.index = i;
                            break;
                        }
                    }
                }
            });
        }

        connectedCallback() {
            this.index = this.index;
        }

        attributeChangedCallback(attrName, oldValue, newValue) {
            console.log('Attribute changed');
            if (attrName === 'index') this.index = parseInt(newValue);
        }

    }

    window.customElements.define('tabbed-content', TabbedContent);
})();

