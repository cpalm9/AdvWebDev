# Server

### Objective

Create a simple server that can serve static file and respond to a few API requests.

### Local Testing

You can test your assignment locally by:
 
1. Run `npm install` within the project directory to install dependencies

2. Running the command: `npm test`

    If you'd like to play with the app as you build it then you can run the command `npm start`, but it won't do much until your app is working.

    Note that you will not be able to test while running with `npm start` because the server port will already be in use.

### Instructions

This project introduces a nearly working application. The front-end application is ready to go, but the back end needs some wiring.

There are two files that you need to work on for this assignment:

#### File 1: server/routes/comments.js

This file has an [express router](http://expressjs.com/en/guide/routing.html) that will receive requests and respond to them.

Within this file you need to create three paths:

1. A path for HTTP GET to `/`.

    This path will use the `database` module to get all of the comments in the database and it will send back all of those comments as JSON. To get all comments:

    `const comments = database.getAllComments()`

2. A path for HTTP POST to `/`.

    This path will read the data posted in the body of the request. You will need to parse the request body using the [body-parser](https://www.npmjs.com/package/body-parser) [middleware](http://expressjs.com/en/guide/using-middleware.html) and then you can save the posted data. Finally it will send back all of the comments.

    Hint - this link might help https://www.npmjs.com/package/body-parser#express-route-specific and you'll want to use the JSON part of the [body-parser](https://www.npmjs.com/package/body-parser)

    `database.addComment('comment value', 'user name')`

3. A path for HTTP DELETE to `/<comment_id>` where `<comment_id>` is the ID of the comment to be deleted.

    Hint - you will want to use express [route parameters](http://expressjs.com/en/guide/routing.html) to be able to get the comment id.

    To delete the comment from the database:

    ```js
    const commentId = 1;
    database.deleteComment(commentId);
    ```
    Finally it will send back all of the comments.

#### File 2: server/index.js

This file is where you'll set up your express server and it needs to meet the following requirements:

1. [Start an express server](http://expressjs.com/en/starter/hello-world.html) listening on port `3000`.

2. Needs to [serve static files](http://expressjs.com/en/starter/static-files.html) from the directory `www`. These are your font-end files.

3. Needs to define an API endpoint `/api/comments` that uses the comments router at `server/routes/comments.js`.
