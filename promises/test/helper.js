'use strict';
const fs = require('fs');

const fastTests = process.argv.length === 3;

Object.defineProperty(exports, 'fastTests', {
    value: fastTests,
    configurable: false
});


exports.empty = function(obj) {
    const result = {};
    Object.keys(obj).forEach(k => {
        result[k] = obj[k];
        delete obj[k];
    });
    return result;
};

exports.require = function(offset, path) {
    const content = fs.readFileSync(path, 'utf8');
    const exports = {};
    const secretSauce = cypher(offset);
    const module = { exports };
    const require = function() { throw Error('You\'re code has been sand boxed. You cannot require another module.') };
    const __dirname = '';
    const __filename = '';
    eval(content);
    return module.exports;
};

exports.random = function() {
    const length = Math.round(Math.random() * 10) + 5;
    let result = '';
    for (let i = 0; i < length; i++) {
        const code = Math.floor(Math.random() * 95) + 32;
        result += String.fromCharCode(code);
    }
    return result;
};



function cypher(offset) {
    const exports = {};

    exports.decrypt = function (hash, callback) {
        if (typeof hash !== 'string') return callback(Error('Value to decrypt must be a string'), null);
        const length = hash.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            let code = hash.charCodeAt(i);
            code += offset;
            if (code > 126) code -= 95;
            result += String.fromCharCode(code);
        }
        setTimeout(() => callback(null, result), random());
    };

    exports.encrypt = function (text, callback) {
        if (typeof text !== 'string') return callback(Error('Value to encrypt must be a string'), null);
        const length = text.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            let code = text.charCodeAt(i);
            code -= offset;
            if (code < 32) code += 95;
            result += String.fromCharCode(code);
        }
        setTimeout(() => callback(null, result), random());
    };

    return exports;
}





function random() {
    return fastTests ? 0 : Math.round(Math.random() * 200) + 500;
}