'use strict';
const fs = require('fs');
const path = require('path');

const t0 = Date.now();

setTimeout(function() {
    console.log(Date.now() - t0);
}, 100);

const large = path.resolve(__dirname, './files/large.txt');
//fs.readFileSync(large);