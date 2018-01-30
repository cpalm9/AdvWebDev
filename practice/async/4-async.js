'use strict';
const fs = require('fs');
const path = require('path');

const small = path.resolve(__dirname, './files/small.txt');
const medium = path.resolve(__dirname, './files/medium.txt');
const large = path.resolve(__dirname, './files/large.txt');

const t0 = Date.now();

fs.readFile(small, function(err, data) {
    const t1 = Date.now();
    console.log('Small: ' + (t1 - t0));

    fs.readFile(medium, function(err, data) {
        const t2 = Date.now();
        console.log('Medium: ' + (t2 - t1));

        fs.readFile(large, function(err, data) {
            const t3 = Date.now();
            console.log('Large: ' + (t3 - t2));

            console.log('Total: ' + (t3 - t0));
        });
    });
});