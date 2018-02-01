(function() {
    "use strict";

    // You're whole assignment is to complete this file according to the criteria.

    const template = `
    <div>
        <form>
            <input type="text">
            <button type="button">Search</button>
        </form>
    </div>
    `;

    class MovieSearch extends HTMLElement {
        static get observedAttribute() {
            return ['movie-search'];
        }

        set value(value) {
            if (value){
                this.shadowRoot.querySelector('input').setAttribute('value', value);
                this.setAttribute('value', value);
            }
        }
        get value(){
            return this.shadowRoot.querySelector('input').getAttribute('value')
        }
        get value(){
            return this.shadowRoot.querySelector('input').value;
        }
        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;
           
            this.shadowRoot.querySelector('button').addEventListener('click', function(e){
                var search = e.target;
                console.log(e)
                document.querySelector('movie-search').search(search)
            });

        }
        search(value) {
            var res = fetch('/api/the-mummy')
            event = document.createEvent('HTMLEvents');
            event.initEvent('search-initiated', true, true);
            event.eventName = 'search-initiated';
            event.detail = this.shadowRoot.querySelector('input').value;
            this.dispatchEvent(event);

            var event1 = document.createEvent('HTMLEvents');
            event1.initEvent('search-results', true, true);
            event1.eventName = 'search-results';
            event1.detail = [res];
            this.dispatchEvent(event1);
        }
        
    }
    window.customElements.define('movie-search', MovieSearch);
    

    function resultsHandler(e){

    }
    
})();