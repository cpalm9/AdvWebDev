
var comments = [];

// update the HTML page to show the latest comments
function update() {
    var elComments = document.querySelector('#comments');
    
    if (comments.length === 0) {
        elComments.innerHTML = '<p>No comments yet</p>'

    } else {
        var frag = document.createDocumentFragment();
        comments.forEach(function (comment) {
            var div = document.createElement('div');
            div.innerHTML = '<div class="comment">' + comment.comment + '</div>' +
                '<div class="name">' + comment.name + '</div>';

            var btn = document.createElement('button');
            btn.innerHTML = '&times;';
            btn.addEventListener('click', function() {
                fetch('/api/comments/' + comment.id, { method: 'DELETE' })
                    .then(function(results) {
                        return results.status === 200 ? results.json() : [];
                    })
                    .then(function(data) {
                        comments = data;
                        update();
                    })
            });
            div.appendChild(btn);

            frag.appendChild(div);
        });
        elComments.innerHTML = '';
        elComments.appendChild(frag);
    }
}

// handle form submission to add a new comment
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    var elComment = document.querySelector('#comment')
    var elName = document.querySelector('#name');

    var config = {
        method: 'POST',
        body: JSON.stringify({
            comment: elComment.value,
            name: elName.value
        }),
        headers: {
            'content-type': 'application/json'
        }
    };

    return fetch('/api/comments', config)
        .then(function(results) {
            if (results.status === 200) {
                elComment.value = '';
                elName.value = ''
            }
            return results.status === 200 ? results.json() : [];
        })
        .then(function(data) {
            comments = data;
            update();
        })
});

// hit the API to get all of the comments
fetch('/api/comments')
    .then(function(results) {
        return results.status === 200 ? results.json() : [];
    })
    .then(function(data) {
        comments = data;
        update();
    });