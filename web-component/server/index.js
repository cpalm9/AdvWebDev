'use strict';
const server    = require('./server');

server()
    .then(server => {
        console.log('Server listening on port ' + server.port);
    })
    .catch(err => {
        console.error(err.stack);
    });