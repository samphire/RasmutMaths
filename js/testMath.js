/**
 * Created by matthew on 7/21/2016.
 */

function getPlusOperands(numDig, numOp) {
    var operands = new Array(numOp);
    for (var a = 0; a < numOp; a++) {
        operands[a] = Math.floor(Math.random() * Math.pow(10, numDig));
    }
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
                randomNum = Math.random();
                operands[c] = Math.floor(randomNum * Math.pow(10, newnumDig));
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
        for (var a = 0; a < numOp; a++) { // making operands
            operands[a] = Math.floor(Math.random() * Math.pow(10, numDig));
        }
    } while (operands[1] > 10 || operands[1] < 2);
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