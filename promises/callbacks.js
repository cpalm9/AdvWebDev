'use strict';
const secrets = secretSauce;

exports.encrypt = function(text, callback) {
    secrets.encrypt(text, callback);
};

exports.decrypt = function(text, callback) {
    secrets.decrypt(text, callback);
};

exports.encryptMultiple = function(textArray, callback) {
    // 1. For each string in the textArray call exports.encrypt to encrypt the string
    // 2. Each encrypt must be run in parallel
    // 3. If one encrypt fails then call the callback immediately with the error as the first parameter
    // 4. If all encrypts succeed then return an array of encrypted strings. They must be in the same order as received.
};

exports.decryptMultiple = function(textArray, callback) {
    // 1. For each string in the textArray call exports.decrypt to decrypt the string
    // 2. Each decrypt must be run in parallel
    // 3. If one decrypt fails then call the callback immediately with the error as the first parameter
    // 4. If all decrypts succeed then return an array of decrypted strings. They must be in the same order as received.
};