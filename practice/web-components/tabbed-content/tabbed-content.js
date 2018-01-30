(function() {
    "use strict";

    const template = `
        <style>
            #tabs {
                display: block;
                background-color: #8AC; /* TODO: set up css variable */
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
                border: 1px solid #8AC; /* TODO: set up css variable */
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

        // TODO: set up static getter for observedAttributes() to return array of attributes to be observed

        // TODO: get the index off of the attribute
        get index() {

        }

        // TODO: set the index on the attribute, set selected tab and content
        set index(value) {

        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            this.addEventListener('click', function(e) {
                // TODO: watch tabs for click events to set index
            });
        }

        // TODO: add connectedCallback() to initialize index value

        // TODO: add attributeChangedCallback(attrName, oldValue, newValue) to update index on change

    }

    window.customElements.define('tabbed-content', TabbedContent);
})();

