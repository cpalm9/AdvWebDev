'use strict';
const fs = require('fs');
const path = require('path');
const readEmitter = require('./read-file');
const writeEmitter = require('./write-file');

// write code to log all fs writes and reads
readEmitter.on('success', function(event) {
    console.log('read file', event);
});
writeEmitter.on('success', function(event) {
    console.log('wrote file', event);
});

// write code to cache read files
const cache = {};
readEmitter.on('success', function(event) {
    console.log('added to cache: ' + event.filePath);
    cache[event.filePath] = event.content;
});
function readFileCacheFirst(filePath, callback) {
    filePath = path.resolve(process.cwd(), filePath);
    if (cache[filePath]) {
        console.log('from cached: ' + filePath);
        callback(null, cache[filePath]);
    } else {
        fs.readFile(filePath, 'utf8', callback);
    }
}

fs.writeFile('./foo.txt', 'foo');
fs.readFile('./foo.txt', 'utf8');

setTimeout(function() {
    readFileCacheFirst('./foo.txt', console.log);
    readFileCacheFirst('./foo.txt', console.log);
}, 1000);