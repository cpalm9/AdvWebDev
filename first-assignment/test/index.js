'use strict';

const index     = require('../bin/index');
const expect    = require('chai').expect;

describe('first-assignment', () => {

    it('can add two non-negative numbers', () => {
        const a = randomInt(0, 100);
        const b = randomInt(0, 100);
        expect(index.add(a,b)).to.equal(a + b);
    });

    it('can add one positive and one negative number', () => {
        const a = randomInt(0, 100);
        const b = randomInt(-100, -1);
        expect(index.add(a,b)).to.equal(a + b);
    });

    it('can subtract two non-negative numbers', () => {
        const a = randomInt(0, 100);
        const b = randomInt(0, 100);
        expect(index.subtract(a,b)).to.equal(a - b);
    });

    it('can subtract one positive and one negative number', () => {
        const a = randomInt(0, 100);
        const b = randomInt(-100, -1);
        expect(index.subtract(a,b)).to.equal(a - b);
    });

});

function randomInt(min, max) {
    const diff = max - min;
    return Math.round(Math.random() * diff) - min;
}