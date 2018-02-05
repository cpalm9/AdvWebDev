'use strict';
const expect        = require('chai').expect;
const puppeteer     = require('puppeteer');
const request       = require('request');
const Server        = require('../server/server');

const indexContent = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Number Selector</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link type="text/css" rel="stylesheet" href="css/main.css">
</head>
<body>
<div id="app">

    <h3>Pets</h3>
    <image-slider :index="pet.index" :images="pet.images" v-on:index-change="petIndexChange"></image-slider>

    <h3>Food</h3>
    <image-slider :index="food.index" :images="food.images" v-on:index-change="foodIndexChange"></image-slider>

    <h3>Landscapes</h3>
    <image-slider :index="landscape.index" :images="landscape.images"  v-on:index-change="landscapeIndexChange"></image-slider>

</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
<script src="components/image-slider.js"></script>
<script src="js/app.js"></script>
</body>
</html>`;

const jsAppContent = `const app = new Vue({
    el: "#app",
    data: {
        duration: 3,
        food: {
            images: ['images/food-1.jpeg', 'images/food-2.jpeg', 'images/food-3.jpeg'],
            index: 0
        },
        landscape: {
            images: ['images/landscape-1.jpeg', 'images/landscape-2.jpeg', 'images/landscape-3.jpeg', 'images/landscape-4.jpeg'],
            index: 1
        },
        pet: {
            images: ['images/pets-1.jpeg', 'images/pets-2.jpeg', 'images/pets-3.jpeg'],
            index: 0
        }
    },
    methods: {
        foodIndexChange: function(value) {
            this.food.index = value;
        },
        landscapeIndexChange: function(value) {
            this.landscape.index = value;
        },
        petIndexChange: function(value) {
            this.pet.index = value;
        }
    }
});`;

describe('vue-component', () => {

    let server;
    let browser;
    let page;
    let host;

    before(async () => {
        server = await Server();
        browser = await puppeteer.launch({ args: [ '--no-sandbox', '--disable-setuid-sandbox' ]});
    });

    beforeEach(async () => {
        page = await browser.newPage();
        host = 'http://localhost:' + server.port;
        await page.goto(host);
        await page.waitForFunction(() => !!app);
    });

    afterEach(async () => {
        await page.close();
    });

    after(async () => {
        browser.close();
        server.stop();
    });

    it('index.html is unchanged', done => {
        request(host + '/index.html', function(err, res, body) {
            if (err) return done(err);
            expect(body).to.equal(indexContent);
            done();
        });
    });

    it('app.js is unchanged', done => {
        request(host + '/js/app.js', function(err, res, body) {
            if (err) return done(err);
            expect(body).to.equal(jsAppContent);
            done();
        });
    });

    it('image-slider only contains one image element', async () => {
        const value = await page.evaluate(() => {
            return document.querySelector('.image-slider')
                .querySelector('.images')
                .querySelectorAll('img')
                .length;
        });
        expect(value).to.equal(1);
    });

    it('image-slider shows correct image', async () => {
        const value = await page.evaluate(host => {
            const src = document.querySelector('.image-slider')
                .querySelector('.images')
                .querySelector('img')
                .src
               .substr(host.length + 1);
            return app.pet.images[app.pet.index] === src;
        }, host);
        expect(value).to.to.true;
    });

    it('changing index shows correct image', async () => {
        const value = await page.evaluate(host => {
            app.pet.index = 1;
            return new Promise(resolve => {
                setTimeout(() => {
                    const src = document.querySelector('.image-slider')
                        .querySelector('.images')
                        .querySelector('img')
                        .src
                        .substr(host.length + 1);
                    resolve(app.pet.images[app.pet.index] === src);
                }, 100);
            });
        }, host);
        expect(value).to.to.true;
    });

    it('clicking right side of image-slider increments index', async () => {
        const value = await page.evaluate(() => {
            const index = app.pet.index;
            document.querySelector('.image-slider')
                .querySelector('.image-slider-right')
                .click();
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(app.pet.index === index + 1);
                }, 100);
            });
        });
        expect(value).to.to.true;
    });

    it('clicking left side of image-slider decrements index', async () => {
        const value = await page.evaluate(() => {
            return new Promise(resolve => {
                app.pet.index = 1;
                setTimeout(() => {
                    document.querySelector('.image-slider')
                        .querySelector('.image-slider-left')
                        .click();
                    setTimeout(() => {
                        resolve(app.pet.index === 0);
                    }, 50);
                }, 50);
            });
        });
        expect(value).to.to.true;
    });

    it('when index is zero, clicking left side of image-slider goes to last index', async () => {
        const value = await page.evaluate(() => {
            return new Promise(resolve => {
                app.pet.index = 0;
                setTimeout(() => {
                    document.querySelector('.image-slider')
                        .querySelector('.image-slider-left')
                        .click();
                    setTimeout(() => {
                        resolve(app.pet.index === app.pet.images.length - 1);
                    }, 50);
                }, 50);
            });
        });
        expect(value).to.to.true;
    });

    it('when index is last, clicking right side of image-slider goes to first index', async () => {
        const value = await page.evaluate(() => {
            return new Promise(resolve => {
                app.pet.index = app.pet.images.length - 1;
                setTimeout(() => {
                    document.querySelector('.image-slider')
                        .querySelector('.image-slider-right')
                        .click();
                    setTimeout(() => {
                        resolve(app.pet.index === 0);
                    }, 50);
                }, 50)
            });
        });
        expect(value).to.to.true;
    });



});