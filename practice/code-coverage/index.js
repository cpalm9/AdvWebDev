'use strict';

exports.addOdds = function() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        const value = arguments[i];
        if (value % 2 === 1) sum += value;
    }
    return sum;
};

exports.isPrime = function(value) {
    const end = Math.floor(Math.sqrt(value));
    for(let i = 2; i <= end; i++) {
        if(value % i === 0) return false;
    }
    return value > 1;
};