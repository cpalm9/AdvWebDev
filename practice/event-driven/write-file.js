'use strict';
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

// define a an event emitter sub-class
class FileWriteEmitter extends EventEmitter {}

// produce an emitter instance and export it
const emitter = new FileWriteEmitter();
module.exports = emitter;

// modify fs.writeFile
const writeFile = fs.writeFile;
Object.defineProperty(fs, 'writeFile', {
    value: myWriteFile,
    writable: true,
    enumerable: true,
    configurable: true
});

function myWriteFile(filePath, content, callback) {
    const start = Date.now();
    filePath = path.resolve(process.cwd(), filePath);

    emitter.emit('start', {
        filePath: filePath,
        content: content
    });

    writeFile(filePath, content, function(err) {
        if (typeof callback === 'function') callback(err);

        // create the done event
        const event = {
            filePath: filePath,
            content: content,
            duration: Date.now() - start
        };

        // if the write filed then send as an error event
        if (err) {
            event.error = err;
            emitter.emit('error', event);

            // if the write succeeded then send as a succeed event
        } else {
            emitter.emit('success', event);
        }
    });
}