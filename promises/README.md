# Promises

### Objective

To learn asynchronous code flow.

### Local Testing

You can test your assignment locally by:
 
1. Run `npm install` within the project directory to install dependencies

2. Running the command: `npm test`

    Note that this assignment takes some time to run tests. During development you can reduce this by running the following command:

    `npm run fast-test`

    Once you feel comfortable with your code, be sure to run it with `npm test` to test it as the server will.

### Instructions

For asynchronous functions that use callbacks, the callback is often called with two parameters. The first parameter is an `Error` object if an error occurred (otherwise `null`) and the second parameter is the value if no error occurred (otherwise `null`).

For example, in NodeJS you'd read a file asynchronously like this:

```js
const fs = require('fs');
fs.readFile('/path/to/file', 'utf8', function(err, content) {
    if (err) {
        console.error(err.stack);
    } else {
        console.log(content);
    }
});
```

For this assignment you need to finish writing the code for two files:

- `callback.js`
- `promises.js`

Within these files you can use the `secret` object to asynchronously encrypt and decrypt strings. Do not remove the line `const secrets = secretSauce;` at the top of each of these files. Do not attempt to require anything within these files.

#### Part 1

Open the `callback.js` file and write the code for the `encryptMultiple` and `decryptMultiple` functions. These functions will receive two parameters:

1. `textArray` - an array of strings to encrypt / decrypt.

2. `callback` - a function to call when the encrypt / decrypt completes. The function should be called with two parameters: 1) An error if one occurred and 2) an array of encrypted or decrypted data.

Make sure that the `callback` parameter is only called once.

**Example**

```js
const callbacks = require('./callbacks.js');
const ar = ['some text', 'to encrypt'];
callbacks.encryptMultiple(ar, function(err, encryptedArray) {
    callbacks.decryptMultiple(encryptedArray, function(err, decryptedArray) {
        console.log(decryptedArray) // ==> ['some text', 'to encrypt']
    });
});
```

#### Part 2

Open the `promises.js` file and write code for the `encrypt`, `decrypt`, `encryptMultiple`, and `decryptMultiple` functions. These functions will receive only one parameter (the value to process) and must return an array.