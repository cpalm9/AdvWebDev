'use strict';
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

// define a an event emitter sub-class
class FileReadEmitter extends EventEmitter {}

// produce an emitter instance and export it
const emitter = new FileReadEmitter();
module.exports = emitter;

// modify fs.readFile
const readFile = fs.readFile;
Object.defineProperty(fs, 'readFile', {
    value: myReadFile,
    writable: true,
    enumerable: true,
    configurable: true
});

function myReadFile(filePath, encoding, callback) {
    const start = Date.now();
    filePath = path.resolve(process.cwd(), filePath);

    emitter.emit('start', {
        filePath: filePath
    });

    readFile(filePath, encoding, function(err, content) {
        if (typeof callback === 'function') callback(err, content);

        // create the done event
        const event = {
            filePath: filePath,
            duration: Date.now() - start
        };

        // if the write filed then send as an error event
        if (err) {
            event.error = err;
            emitter.emit('error', event);

        // if the write succeeded then send as a succeed event
        } else {
            event.content = content;
            emitter.emit('success', event);
        }
    });
};