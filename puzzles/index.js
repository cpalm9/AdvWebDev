'use strict';

module.exports = {
    evenOrOdd,
    wordsInReverse,
    countPositivesSumNegatives
};

function evenOrOdd(number) {
    var num = "";
    if (number % 2 == 0){
        num = "Odd";
    }
    else {
        num = "Even";
    }
    return num;
}

function wordsInReverse(string) {
    var words = string.split(" ");
    return words.reverse().join(" ");
    // var words = string.split(" ");
    // var newAr = [];

    // for (var x = words.length; x >= 0; x--){

    //     newAr.push(words[x]);
    // }
    // return newAr.join(" ");
}

function countPositivesSumNegatives(numbers) {
    var negativeAr = new Array();
    var positiveAr = new Array();
    var output = new Array();
    for(var i = 0; i < numbers.length; i++){
        if (numbers[i] < 0){
            negativeAr.push(numbers[i]);
        }
        else {
            positiveAr.push(numbers[i]);
        }
    }
    console.log(positiveAr)
    output.push(positiveAr.length);
    output.push(negativeAr.reduce(add, 0));
    return output
}

function add(a, b) {
    return a + b;
}