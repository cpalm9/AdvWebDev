'use strict';
const database = require('../database');
const Router = require('express').Router;
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
const router = new Router();
module.exports = router;

// put your code down here
router.get('/', (req,res) => {
    const comments = database.getAllComments()
    res.json(comments)
})

router.post('/', jsonParser,(req, res) => {
    if (!req.body) return res.send('NO WORKIE')
    database.addComment(req.body.comment, req.body.name);
    var comments = database.getAllComments();
    res.json(comments);
})
router.delete('/:comment_id', (req, res) => {
    database.deleteComment(req.params.comment_id)
    var comments = database.getAllComments();
    res.json(comments);
})