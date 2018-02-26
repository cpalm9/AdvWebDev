'use strict';
const helper    = require('./helper');
const expect    = require('chai').expect;
const path      = require('path');

describe('promises', () => {
    const random = helper.random;

    describe('offset 1', () => {
        const promises = helper.require(1, path.resolve(__dirname, '../promises.js'));

        describe('encrypt', () => {

            it('b => a', async () => {
                const value = await promises.encrypt('b');
                expect(value).to.equal('a');
            });

            it('[space] => ~', async () => {
                const value = await promises.encrypt(' ');
                expect(value).to.equal('~');
            });

            it('non string error', () => {
                const err = Error();
                return promises.encrypt(123)
                    .then(() => { throw err; })
                    .catch(e => {
                        expect(e).not.to.equal(err);
                    });
            });

        });

        describe('decrypt', () => {

            it('a => b', async () => {
                const value = await promises.decrypt('a');
                expect(value).to.equal('b');
            });

            it('~ => [space]', async () => {
                const value = await promises.decrypt('~');
                expect(value).to.equal(' ');
            });

            it('non string error', () => {
                const err = Error();
                return promises.decrypt(123)
                    .then(() => { throw err; })
                    .catch(e => {
                        expect(e).not.to.equal(err);
                    });
            });

        });

        describe('encryptMultiple', () => {

            it('[b, c, d] => [a, b, c]', async () => {
                const value = await promises.encryptMultiple(['b', 'c', 'd']);
                expect(value).to.deep.equal(['a', 'b', 'c']);
            });

            it('non string error', () => {
                const err = Error();
                return promises.encryptMultiple(['b', 123, 'd'])
                    .then(() => { throw err })
                    .catch(e => expect(e).not.to.equal(err));
            });

        });

        describe('decryptMultiple', () => {

            it('[a, b, c] => [b, c, d]', async () => {
                const value = await promises.decryptMultiple(['a', 'b', 'c']);
                expect(value).to.deep.equal(['b', 'c', 'd']);
            });

            it('non string error', () => {
                const err = Error();
                return promises.decryptMultiple(['a', 123, 'c'])
                    .then(() => { throw err })
                    .catch(e => expect(e).not.to.equal(err));
            });

        });

    });

    describe('random offset', () => {
        const offset = Math.round(Math.random() * 50) + 5;
        const words = [ random(), random(), random(), random(), random() ];
        const promises = helper.require(offset, path.resolve(__dirname, '../promises.js'));

        it('encrypt and decrypt ' + words[0] + ' with offset ' + offset, async () => {
            const v1 = await promises.encrypt(words[0]);
            const v2 = await promises.decrypt(v1);
            expect(v2).to.equal(words[0]);
        });

        it('encryptMultiple and decryptMultiple [' + words.join(', ') + '] with offset ' + offset, async () => {
            const v1 = await promises.encryptMultiple(words);
            const v2 = await promises.decryptMultiple(v1);
            expect(v2).to.deep.equal(words);
        });

    });

});