/**
 * Created by matthew on 7/7/2016.
 */

$(document).ready(function () {
    fetchData();
    $('#test').hide();
});

function fetchData() {
    $.ajax({
        url: 'data.php',
        datatype: 'json',
        success: function (data) {
            alert(data);
        },
        fail: function () {
            alert('fail');
        }
    });
}


var i, a, b, c, rand1, rand2, answer;
// user information
var chosenUser, chosenStory, name, nickname, email ;
var numberOfQuestions;
var streak = 0;
var testArr = [];
for (i = 0; i < 20; i++) {
    rand1 = Math.floor(Math.random() * 19) + 1;
    rand2 = Math.floor(Math.random() * 19) + 1;
    answer = rand1 + rand2;
    testArr.push({r1: rand1, r2: rand2, result: answer});
}

function makeTest(numDig, numOp, op, numq) { //Number of digits in the operands, number of operands, operator, number of questions
    chosenUser = 1;  //fake hard setting user and story
    chosenStory = 2;
    name="Samantha";
    nickname="Rasmut";
    email="sam@sam.com";
    numberOfQuestions = numq;
    var operands = new Array(numOp);
    var newElement, newTextNode, opChar, answer;
    var place = document.getElementById("test");
    switch (op) { // print correct operator
        case 0:
            opChar = "+";
            break;
        case 1:
            opChar = "-";
            break;
        case 2:
            opChar = "*";
            break;
        case 3:
            opChar = "/";
            break;
    }

    for (i = 0; i < numq; i++) {
        var plusAns = 0;
        var minAns = 0;
        var timAns = 0;
        var divAns = 0;
        for (a = 0; a < numOp; a++) {
            operands[a] = Math.floor(Math.random() * Math.pow(10, numDig));
        }
        for (b = 0; b < operands.length; b++) {
            plusAns += operands[b];
            minAns -= operands[b];
            timAns *= operands[b];
            divAns /= operands[b];
            if (i === 1) {
                minAns = operands[0] - operands[1];
                timAns = operands[0] * operands[1];
                divAns = operands[0] / operands[1];
            }
        }
        for (c = 0; c < numOp; c++) {
            newElement = document.createElement("span");
            newTextNode = document.createTextNode("" + operands[c]);
            newElement.appendChild(newTextNode);
            place.appendChild(newElement);
            if (c < (numOp - 1)) {
                newElement = document.createElement("span");
                newTextNode = document.createTextNode(opChar);
                newElement.appendChild(newTextNode);
                place.appendChild(newElement);
            }
        }
        newElement = document.createElement("span");
        newTextNode = document.createTextNode("=");
        newElement.appendChild(newTextNode);
        place.appendChild(newElement);
        newElement = document.createElement("input");
        newElement.setAttribute("size", "5");
        newElement.id = "input" + (i + 1);
        answer = 0;
        switch (op) { // work out the answer!
            case 0: // plus
                answer = plusAns;
                break;
            case 1: // minus
                answer = minAns;
                break;
            case 2: // times
                answer = timAns;
                break;
            case 3: // divide
                answer = divAns;
                break;
        }
        newElement.setAttribute('data-result', answer);
        newElement.addEventListener("keydown", checkResult);
        place.appendChild(newElement);
        place.appendChild(document.createElement("br"));
        $('#welcome').hide();
        $('#test').show();
    }
}

function checkResult(event) {
    if (event.keyCode === 13) {
        if (this.getAttribute('data-result') === this.value) {
            this.style.backgroundColor = "rgba(10,255,10,0.5)";
            streak += 1;
            if (streak === 20) {
                document.body.innerHTML = "<h1>Oh Yeah!</h1>";
            }
            document.getElementById("streak").innerText = streak;
        } else {
            streak = 0;
            this.style.backgroundColor = "rgba(255,10,10,0.5)";
            document.getElementById("streak").innerText = streak;
        }
        var nextQ = parseInt(this.id.slice(5)) + 1;
        if (nextQ <= numberOfQuestions) {
            document.getElementById('input' + nextQ).focus();
        } else{
            //Perfect?
            if(streak === numberOfQuestions){
                alert('perfect');
            }
            //Finish exercise
            $('#test').hide();
            $('#welcome').show();
        }

    }
}