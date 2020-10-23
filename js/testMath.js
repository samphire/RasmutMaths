/**
 * Created by matthew on 7/21/2016.
 * Updated by matthew in October 2020.
 */

var timesTableNumber = 0;

function getPlusOperands(numDig, numOp) {
    var operands = new Array(numOp);
    var myNum;
    do {
        for (var a = 0; a < numOp; a++) {
            do {
                myNum = Math.floor(Math.random() * Math.pow(10, numDig));
            } while (myNum < 1);
            operands[a] = myNum
        }
    } while (operands[0] === operands[1]);
    return operands;
}


function getMinusOperands(numDig, numOp) {
    var operands = new Array(numOp);
    do {
        // create first operand, greater than 0, 10, 100 etc...
        var randomNum = Math.random();
        do {
            randomNum = Math.random();
            operands[0] = Math.floor(randomNum * Math.pow(10, numDig));
        } while (randomNum < 0.1);

        if (numOp > 2) { // More than 2 operands... have to decrease digit length!
            var newnumDig;
            for (var c = 1; c < numOp; c++) {
                newnumDig = Math.floor(Math.random() * 10) % 2 === 0 ? numDig : numDig - 1; // digit length is random
                newnumDig = newnumDig === 0 ? 1 : newnumDig // must be at least 1
                do {
                    randomNum = Math.random();
                    operands[c] = Math.floor(randomNum * Math.pow(10, newnumDig));
                }
                while (operands[c] < 1);
            }
        } else {
            randomNum = Math.random();
            operands[1] = Math.floor(randomNum * Math.pow(10, numDig));
        }
        // Make sure result is positive
        var operandTotalApartFirst = 0;
        for (var z = 1; z < numOp; z++) {
            operandTotalApartFirst += operands[z];
        }
    }
    while (operands[0] <= operandTotalApartFirst);

    return operands;
}


function getTimesOperands(numDig, numOp) {
    var operands = new Array(numOp);
    do {
        operands[0] = Math.floor(Math.random() * 10);
    } while (operands[0] < 2);
    do {
        operands[1] = Math.floor(Math.random() * Math.pow(10, numDig));
    } while (operands[1] < 2);

    if (numOp > 2) {
        for (var a = 1; a < numOp; a++) { // making operands
            operands[a] = Math.floor(Math.random() * Math.pow(10, numDig));
            operands[a] = operands[a] > 1 ? operands[a] : Math.floor(Math.random() * Math.pow(10, numDig)) + 1;
        }
    }

    return operands;
}


function getDivOperands(numDig, numOp) {
    var operands = new Array(numOp);
    do {
        operands[1] = Math.floor(Math.random() * Math.pow(10, 1));
        operands[0] = operands[1] * Math.floor(Math.random() * Math.pow(10, numDig));
    } while (operands[0] < 1 || operands[1] < 2 || operands[0] === operands[1]);
    return operands;
}


function getTimesTableOperandsMultiply(numDig, numOp, btnImage, timesTableOp) {
    timesTableNumber = parseInt(btnImage.substr(0, btnImage.length - 4));
    var operands = new Array(numOp);

    // operands[0] = Math.floor(Math.random() * 10) + 2;
    operands[0] = timesTableOp;
    operands[1] = timesTableNumber;

    return operands;
}


function getTimesTableOperandsDivide(numDig, numOp, btnImage, timesTableOp) {
    timesTableNumber = parseInt(btnImage.substr(0, btnImage.length - 4));
    var operands = new Array(numOp);
    let x = timesTableNumber;
    operands[0] = timesTableOp * x;
    operands[1] = x;
    return operands;
}


// ####### Stopwatch Functions #######

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedMM = mm.toString().padStart(1, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    avgTime = elapsedTime / numberOfQuestions;
    return `${formattedMM}:${formattedSS}`;
}

// Declare variables to use in our functions below

let startTime;
let elapsedTime = 0;
let timerInterval;
let avgTime = 10;

// Create function to modify innerHTML

function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Create "start", "pause" and "reset" functions

function start() {
    elapsedTime = 0;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
}