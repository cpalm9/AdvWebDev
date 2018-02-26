'use strict';
const bodyParser        = require('body-parser');
const commentsRouter    = require('./routes/comments');
const express           = require('express');

// put your code down here

const app = express();
app.use(express.static('www'));
app.use('/api/comments', commentsRouter);
app.listen(3000, function () {
    console.log('Server running on port 3000')
});