# First Assignment

The purpose of this assignment is to introduce you to the grading utility.

1. Download this assignment: so.

1. Install the grader. From a command line: `npm install -g Gi60s/IT410-grader`.

    - This will give you command line access to several utilities that you will use to grade your assignments.

2. Initialize your assignment by executing: `it410 init first-assignment`

    - This will create a directory with some starter structure.

4. In the assignment directory you will see a file `bin/index.js` with this content:

    ```js
    exports.add = function(a, b) {
        return a + b;
    };
    
    exports.subtract = function(a, b) {
        return a + b;
    };
    ```

5. Run the command `npm install` from the directory to install dependencies.
    
6. Run any local tests that were provided with this assignment by running: `npm test`

    - This will output a report showing which tests passed and which tests failed.
     
    - You should see that one test failed. Read the error to determine the fix, update your `index.js` file, and then to evaluate again (Step 5).

7. Test the assignment against the submission server: `it410 evaluate first-assignment`

    - This will run its own set of tests that are generally more rigorous than what was provided locally. 

    - The results will show a test report and the score you would receive if you were to submit now.
     
    - If you are satisfied with your score then you can submit now, following Step 7, otherwise continue to make fixes and re-evaluate.

8. Once you are satisfied with your score, submit the assignment: `it410 submit first-assignment`

    - This will provide a login prompt to log you into BYU.
    
    - Once authenticated, your assignment will be submitted and you will receive an email with your assignment results.
    
    - You can resubmit at any time, but if you submit after the deadline you will receive a 20% deduction on your score.