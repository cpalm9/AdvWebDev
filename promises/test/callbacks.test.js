'use strict';
const helper    = require('./helper');
const expect    = require('chai').expect;
const path      = require('path');

describe('callbacks', () => {
    const random = helper.random;

    describe('offset 1', () => {
        const callbacks = helper.require(1, path.resolve(__dirname, '../callbacks.js'));

        describe('encrypt', () => {

            it('b => a', done => {
                callbacks.encrypt('b', (err, value) => {
                    if (err) return done(err);
                    expect(value).to.equal('a');
                    done();
                });
            });

            it('[space] => ~', done => {
                callbacks.encrypt(' ', (err, value) => {
                    if (err) return done(err);
                    expect(value).to.equal('~');
                    done();
                });
            });

            it('non string error', done => {
                callbacks.encrypt(123, err => {
                    expect(err).to.be.instanceOf(Error);
                    done();
                });
            });

        });

        describe('decrypt', () => {

            it('a => b', done => {
                callbacks.decrypt('a', (err, value) => {
                    if (err) return done(err);
                    expect(value).to.equal('b');
                    done();
                });
            });

            it('~ => [space]', done => {
                callbacks.decrypt('~', (err, value) => {
                    if (err) return done(err);
                    expect(value).to.equal(' ');
                    done();
                });
            });

            it('non string error', done => {
                callbacks.decrypt(123, err => {
                    expect(err).to.be.instanceOf(Error);
                    done();
                });
            });

        });

        describe('encryptMultiple', () => {

            it('[b, c, d] => [a, b, c]', done => {
                callbacks.encryptMultiple(['b', 'c', 'd'], (err, value) => {
                    if (err) return done(err);
                    expect(value).to.deep.equal(['a', 'b', 'c']);
                    done();
                });
            });

            it('non string error', done => {
                callbacks.encryptMultiple(['b', 123, 'd'], err => {
                    expect(err).to.be.instanceOf(Error);
                    done();
                });
            });

            it('callback once', done => {
                let count = 0;
                callbacks.encryptMultiple(['b', 123, 'd'], () => {
                    count++;
                });
                setTimeout(() => {
                    expect(count).to.equal(1);
                    done();
                }, helper.fastTests ? 300 : 2500)
            }).timeout(3000);

        });

        describe('decryptMultiple', () => {

            it('[a, b, c] => [b, c, d]', done => {
                callbacks.decryptMultiple(['a', 'b', 'c'], (err, value) => {
                    if (err) return done(err);
                    expect(value).to.deep.equal(['b', 'c', 'd']);
                    done();
                });
            });

            it('non string error', done => {
                callbacks.decryptMultiple(['a', 123, 'c'], err => {
                    expect(err).to.be.instanceOf(Error);
                    done();
                });
            });

            it('callback once', done => {
                let count = 0;
                callbacks.decryptMultiple(['b', 123, 'd'], () => {
                    count++;
                });
                setTimeout(() => {
                    expect(count).to.equal(1);
                    done();
                }, helper.fastTests ? 300 : 2500)
            }).timeout(3000);

        });

    });

    describe('random offset', () => {
        const offset = Math.round(Math.random() * 50) + 5;
        const words = [ random(), random(), random(), random(), random() ];
        const callbacks = helper.require(offset, path.resolve(__dirname, '../callbacks.js'));

        it('encrypt and decrypt ' + words[0] + ' with offset ' + offset, done => {
            callbacks.encrypt(words[0], (err, v1) => {
                if (err) return done(err);
                callbacks.decrypt(v1, (err, v2) => {
                    if (err) return done(err);
                    expect(v2).to.equal(words[0]);
                    done();
                });
            });
        });

        it('encryptMultiple and decryptMultiple [' + words.join(', ') + '] with offset ' + offset, done => {
            callbacks.encryptMultiple(words, (err, v1) => {
                if (err) return done(err);
                callbacks.decryptMultiple(v1, (err, v2) => {
                    if (err) return done(err);
                    expect(v2).to.deep.equal(words);
                    done();
                });
            });
        });

    });

});