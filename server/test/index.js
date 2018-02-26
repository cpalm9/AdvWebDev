'use strict';
const expect    = require('chai').expect;
const fork      = require('child_process').fork;
const fs        = require('fs');
const path      = require('path');
const request   = require('request-promise-native');

describe('server', () => {
    let child;
    let num;

    before(() => {
        child = fork(path.resolve(__dirname, '../server/index'));
    });

    after(() => {
        child.kill('SIGINT');
    });

    it('server listening on port 3000', async () => {
        let done = false;
        while (!done) {
            done = true;
            await wait(50);
            try {
                await request({
                    method: 'GET',
                    uri: 'http://localhost:3000',
                    resolveWithFullResponse: true
                });
            } catch (err) {
                if (err.cause.code) done = false;
            }
        }
    }).timeout(2000);

    it('request to path http://localhost:3000 loads index', async() => {
        const res = await request({
            method: 'GET',
            uri: 'http://localhost:3000'
        });
        expect(/<body>/.test(res)).to.be.true;
    });

    it('request to http://localhost:3000/main.css loads css file', async() => {
        const content = fs.readFileSync(path.resolve(__dirname, '../www/main.css'), 'utf8');
        const res = await request({
            method: 'GET',
            uri: 'http://localhost:3000/main.css'
        });
        expect(res).to.equal(content);
    });

    it('request to GET http://localhost:3000/api/comments loads comments', async() => {
        const res = await request({
            method: 'GET',
            uri: 'http://localhost:3000/api/comments',
            json: true
        });
        expect(res).to.deep.equal([
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
        ]);
    });

    it('request to POST http://localhost:3000/api/comments adds comment and loads comments', async() => {
        num = Math.round(Math.random() * 2000) + 1000;
        const res = await request({
            method: 'POST',
            uri: 'http://localhost:3000/api/comments',
            body: {
                comment: 'This is a new comment',
                name: 'user ' + num
            },
            json: true
        });
        expect(res).to.deep.equal([
            {
                id: '0',
                comment: 'First!!!',
                name: 'James'
            },
            {
                id: '1',
                comment: 'Oh good. You have the GET /api/comments endpoint working.',
                name: 'James'
            },
            {
                id: '2',
                comment: 'This is a new comment',
                name: 'user ' + num
            }
        ]);
    });

    it('request to DELETE http://localhost:3000/api/comments/1 deletes comment and loads comments', async() => {
        const res = await request({
            method: 'DELETE',
            uri: 'http://localhost:3000/api/comments/1',
            json: true
        });
        expect(res).to.deep.equal([
            {
                id: '0',
                comment: 'First!!!',
                name: 'James'
            },
            {
                id: '2',
                comment: 'This is a new comment',
                name: 'user ' + num
            }
        ]);
    });

});

function wait(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}