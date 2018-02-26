'use strict';
const secrets = secretSauce;

exports.encrypt = function(text) {
    // 1. Create a new promise that calls secrets.encrypt
    // 2. When secrets.encrypt's callback is triggered resolve or reject the promise
    return new Promise(function(resolve, reject){
        secrets.encrypt(text, function(err, data){
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
};

exports.decrypt = function(text) {
    // 1. Create a new promise that calls secrets.decrypt
    // 2. When secrets.decrypt's callback is triggered resolve or reject the promise
    return new Promise(function(resolve, reject){
        secrets.decrypt(text, function(err, data){
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
};

exports.encryptMultiple = function(textArray) {
    // 1. Create a promises array
    // 2. Call exports.encrypt for each item in the textArray and store each result into the promises array
    // 3. Return a promise for all resolved promises using Promise.all
    var encryptedArray = []
    textArray.forEach(el => {
        encryptedArray.push(exports.encrypt(el));
    })

    return Promise.all(encryptedArray)
};

exports.decryptMultiple = function(textArray) {
    // 1. Create a promises array
    // 2. Call exports.decrypt for each item in the textArray and store each result into the promises array
    // 3. Return a promise for all resolved promises using Promise.all
    var encryptedArray = []
    textArray.forEach(el => {
        encryptedArray.push(exports.decrypt(el));
    })

    return Promise.all(encryptedArray)
};