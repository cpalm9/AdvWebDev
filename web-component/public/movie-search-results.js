(function() {
    "use strict";

    // HTML for Web Component goes inside the template
    const template = `
<style type="text/css">
    ul { margin: 0; padding: 0; list-style: none }
    ul li { margin: 0; padding: 5px 0 30px 0; float: left; width: 320px; }
    img { height: 400px; }
</style>
<ul></ul>`;

    // Define the controller for the Web Component
    class MovieSearchResults extends HTMLElement {

        static get observedAttributes() {
            return ['movie-search-id'];
        }

        constructor() {
            super();
            let shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.innerHTML = template;

            this.ul = this.shadowRoot.querySelector('ul');
        }

        connectedCallback() {
            this.movieSearchElement = document.getElementById(this.getAttribute('movie-search-id'));
            if (this.movieSearchElement) {
                this.resultsHandler = resultsHandler.bind(this);
                this.movieSearchElement.addEventListener('search-results', this.resultsHandler);
            }
        }

        attributeChangedCallback(attrName, oldValue, newValue) {
            if (attrName === 'movie-search-id') {
                if (this.resultsHandler) {
                    this.movieSearchElement.removeEventListener('search-results', this.resultsHandler);
                    this.resultsHandler = null;
                }

                this.movieSearchElement = document.getElementById(newValue);
                if (this.movieSearchElement) {
                    this.resultsHandler = resultsHandler.bind(this);
                    this.movieSearchElement.addEventListener('search-results', this.resultsHandler);
                }
            }
        }

    }

    // Define the Web Component
    window.customElements.define('movie-search-results', MovieSearchResults);

    function resultsHandler(e) {
        // erase contents of results
        this.ul.innerHTML = '';

        const results = e.detail || [];
        results
            .filter(result => result.Poster !== 'N/A')
            .forEach(result => {
                const el = document.createElement('li');
                el.innerHTML = `
                    <img class='poster' src="${result.Poster}">
                    <div>${result.Title} (${result.Year})</div>
                `;
                this.ul.appendChild(el);
            });
    }

})();