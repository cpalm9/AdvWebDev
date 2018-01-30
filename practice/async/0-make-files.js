'use strict';
const fs        = require('fs');
const path      = require('path');

function write(fileName, content, size, done) {
    const stream = fs.createWriteStream(path.resolve(__dirname, 'files', fileName + '.txt'), 'utf8');
    let length = 0;

    let str = '';
    while (str.length < 1000000) str += content + ' ';

    function run() {
        if (length < size) {
            length += str.length + 1;
            stream.write(str + ' ');
            process.nextTick(run);
            console.log(fileName + ': ' + Math.floor(100 * length / size));
        } else {
            stream.end();
            done();
        }
    }

    run();
}

fs.mkdirSync(path.resolve(__dirname, 'files'));
write('small',  'small ', 100000000, function() {
    write('medium', 'medium', 500000000, function() {
        write('large',  'large ', 1000000000, function() {});
    });
});