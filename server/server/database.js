'use strict';

let id = 2;
const comments = [
    {
        id: '0',
        comment: 'First!!!',
        name: 'James'
    },
    {
        id: '1',
        comment: 'Oh good. You have the GET /api/comments endpoint working.',
        name: 'James'
    }
];

/**
 * Add a comment to the database.
 * @param {string} comment
 * @param {string} name
 */
exports.addComment = function(comment, name) {
    comments.push({
        id: '' + id++,
        comment,
        name
    });
};

/**
 * Delete a comment from the database.
 * @param {number} id
 */
exports.deleteComment = function(id) {
    const index = comments.findIndex(comment => comment.id === id);
    if (index !== -1) comments.splice(index, 1);
};

/**
 * Get all comments from the database.
 * @returns {Array.<{comment, name}>}
 */
exports.getAllComments = function() {
    return comments.slice(0);
};