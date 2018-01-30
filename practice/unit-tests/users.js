'use strict';

const store = {};

exports.addUser = function(obj) {
    const err = exports.validateUserObject(obj);
    if (err) throw Error('Cannot add user. ' + err);
    if (store.hasOwnProperty(obj.user)) throw Error('Cannot add user "' + obj.user + '" because another user with that name already exists.');
    store[obj.user] = obj;
};

exports.getUser = function(username) {
    return store[username];
};

exports.getUsers = function() {
    return Object.keys(store)
        .map(k => store[k]);
};

exports.updateUser = function(username, obj) {
    if (!store.hasOwnProperty(username)) throw Error('Cannot update user. User does not exist: ' + username);

    const err = exports.validateUserObject(obj);
    if (err) throw Error('Cannot update user. ' + err);

    exports.deleteUser(username);
    exports.addUser(obj);
};

exports.deleteUser = function(username) {
    delete store[username];
};

exports.deleteAll = function() {
    Object.keys(store).forEach(k => delete store[k]);
};

exports.validateUserObject = function(obj) {
    if (!obj || typeof obj !== 'object') return 'Expect an object. Received: ' + obj;
    if (!obj.hasOwnProperty('user')) return 'Missing required property: user';
    if (typeof obj.user !== 'string') return 'Property "user" must be a string.';
};