'use strict';
const expect        = require('chai').expect;
const puppeteer     = require('puppeteer');
const Server        = require('../server/server');


const indexContent = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Movie Search</title>
</head>
<body>

<p>A form will appear below when your web-component is implemented.</p>
<movie-search id="my-search" value="The Mummy"></movie-search>
<movie-search-results movie-search-id="my-search"></movie-search-results>

<script src="movie-search.js"></script>
<script src="movie-search-results.js"></script>

</body>
</html>`;

describe.only('web-component', () => {

    let server;
    let browser;
    let page;

    before(async () => {
        server = await Server();
        browser = await puppeteer.launch();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:' + server.port);
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        browser.close();
        server.stop();
    });

    describe('index.html', () => {

        it('is unchanged', async () => {
            const handle = await page.evaluateHandle('document');
            const resultHandle = await page.evaluateHandle(doc => doc.documentElement.outerHTML, handle);
            const value = await resultHandle.jsonValue();
            await resultHandle.dispose();
            expect(value.replace(/>\s+</g, '><')).to.equal(indexContent.replace(/>\s+</g, '><'));
        });

        it('has movie-search element', async () => {
            const handle = await page.evaluateHandle('document');
            const resultHandle = await page.evaluateHandle(doc => doc.querySelector('movie-search') !== null, handle);
            const value = await resultHandle.jsonValue();
            await resultHandle.dispose();
            expect(value).to.be.true;
        });

    });

    describe('movie-search', () => {

        it('web component defined', async () => {
            const handle = await page.evaluateHandle('document');
            const resultHandle = await page.evaluateHandle(doc => {
                switch(document.createElement('movie-search').constructor) {
                    case HTMLElement: return false;
                    case HTMLUnknownElement: return false;
                }
                return true;
            }, handle);
            const value = await resultHandle.jsonValue();
            await resultHandle.dispose();
            expect(value).to.be.true;
        });

        it('has shadow root', async () => {
            const handle = await page.evaluateHandle('document');
            const resultHandle = await page.evaluateHandle(doc => document.createElement('movie-search').shadowRoot !== null, handle);
            const value = await resultHandle.jsonValue();
            await resultHandle.dispose();
            expect(value).to.be.true;
        });

        it('has exactly one text input', async () => {
            const value = await page.evaluate(() => {
                const inputs = document.createElement('movie-search').shadowRoot.querySelectorAll('input');
                return Array.from(inputs).filter(el => el.type === 'text').length;
            });
            expect(value).to.equal(1);
        });

        it('has exactly one button', async () => {
            const value = await page.evaluate (() => {
                const shadow = document.createElement('movie-search').shadowRoot;
                const inputs = shadow.querySelectorAll('input');
                const buttons = shadow.querySelectorAll('button');
                return Array.from(inputs).filter(el => el.type === 'submit' || el.type === 'button').length + Array.from(buttons).length;
            });
            expect(value).to.equal(1);
        });

        it('can set component value via property', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                const el = document.createElement('movie-search');
                const input = el.shadowRoot.querySelector('input');

                el.value = title;
                return input.value;
            }, title);
            expect(value).to.equal(title);
        });

        it('can get component value via property', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                const el = document.createElement('movie-search');
                const input = el.shadowRoot.querySelector('input');

                input.value = title;
                return el.value;
            }, title);
            expect(value).to.equal(title);
        });

        it('can set component value via attribute', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                const el = document.createElement('movie-search');
                const input = el.shadowRoot.querySelector('input');

                el.setAttribute('value', title);
                return input.value;
            }, title);
            expect(value).to.equal(title);
        });

        it('can get component value via attribute', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                const el = document.createElement('movie-search');
                el.value = title;
                return el.getAttribute('value');
            }, title);
            expect(value).to.equal(title);
        });

        it('component has a search function', async () => {
            const value = await page.evaluate(() => {
                const el = document.createElement('movie-search');
                return typeof el.search === 'function';
            });
            expect(value).to.be.true;
        });

        it('calling component search function emits "search-initiated" event', async () => {
            const value = await page.evaluate(() => {
                return new Promise(resolve => {
                    const el = document.createElement('movie-search');
                    let timeoutId = setTimeout(() => resolve(false), 1000);
                    el.addEventListener('search-initiated', () => {
                        clearTimeout(timeoutId);
                        resolve(true);
                    });
                    el.search();
                });
            });
            expect(value).to.be.true;
        });

        it('"search-initiated" event has search term in detail property', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                return new Promise(resolve => {
                    const el = document.createElement('movie-search');
                    let timeoutId = setTimeout(() => resolve('[ timeout ]'), 1000);
                    el.addEventListener('search-initiated', event => {
                        clearTimeout(timeoutId);
                        resolve(event.detail);
                    });
                    el.value = title;
                    el.search();
                });
            }, title);
            expect(value).to.equal(title);
        });

        it('clicking button initiates search', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                return new Promise(resolve => {
                    const el = document.createElement('movie-search');
                    const shadow = el.shadowRoot;
                    const button = shadow.querySelector('button') ||
                        Array.from(shadow.querySelectorAll('input')).filter(i => i.type === 'submit' || i.type === 'button')[0];
                    document.body.appendChild(el);

                    let timeoutId = setTimeout(() => resolve('[ timeout ]'), 1000);
                    el.value = title;
                    el.addEventListener('search-initiated', event => {
                        clearTimeout(timeoutId);
                        resolve(event.detail);
                    });
                    button.click();
                });
            }, title);
            expect(value).to.equal(title);
        });

        it('"search-results" event emitted after search completion', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                return new Promise(resolve => {
                    const el = document.createElement('movie-search');
                    el.value = title;

                    let timeoutId = setTimeout(() => resolve(false), 1000);
                    el.value = title;
                    el.addEventListener('search-results', () => {
                        clearTimeout(timeoutId);
                        resolve(true);
                    });
                    el.search();
                });
            }, title);
            expect(value).to.be.true;
        });

        it('"search-results" event has results in detail property', async () => {
            const title = 'Mystery Science Theater ' + Math.round(Math.random() * 10000);
            const value = await page.evaluate(title => {
                return new Promise(resolve => {
                    const el = document.createElement('movie-search');
                    el.value = title;

                    let timeoutId = setTimeout(() => resolve('[ timeout ]'), 1000);
                    el.value = title;
                    el.addEventListener('search-results', event => {
                        clearTimeout(timeoutId);
                        resolve(event.detail);
                    });
                    el.search();
                });
            }, title);
            expect(value).not.to.be.undefined;
        });

    });

});