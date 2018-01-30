'use strict';
const fs = require('fs');
const path = require('path');

const small = path.resolve(__dirname, './files/small.txt');
const medium = path.resolve(__dirname, './files/medium.txt');
const large = path.resolve(__dirname, './files/large.txt');

const t0 = Date.now();

fs.readFile(small, function(err, data) {
    console.log('Small: ' + (Date.now() - t0));
});

fs.readFile(medium, function(err, data) {
    console.log('Medium: ' + (Date.now() - t0));
});

fs.readFile(large, function(err, data) {
    console.log('Large: ' + (Date.now() - t0));
});

console.log('Total: ' + (Date.now() - t0));