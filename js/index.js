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
            // alert(data);
            var myData = (JSON.parse(data));
            welcomedata = myData.allData[0].welcomeData[0];
            exercisedata = myData.allData[1].exerciseData;

            // alert(JSON.stringify(welcomedata) + "\n\n" + JSON.stringify(exercisedata));

            chosenUser = welcomedata.id;
            chosenStory = welcomedata.story_name;
            chosenStoryId = exercisedata[0].storyid;
            avatar_lvl = parseInt(welcomedata.avatar_lvl);
            perfects = parseInt(welcomedata.perfects);
            cash_won = parseInt(welcomedata.cash_won);
            cash_paid = parseInt(welcomedata.cash_paid);
            setWelcomeData();
        },
        fail: function () {
            alert('fail');
        }
    });
}
// user information
var welcomedata, exercisedata;
var chosenUser, chosenStory, chosenStoryId, avatar_lvl, perfects, cash_won, cash_paid;
// exercise information
var exId, itDone, exIndex;


var a, b, c;
var numberOfQuestions;
var streak = 0;

function makeTest(numDig, numOp, op, numq, exid, itdone, exindex) { //Number of digits in the operands, number of operands, operator, number of questions
    exId = exid;
    itDone = itdone;
    exIndex = exindex;
    numberOfQuestions = numq;
    var operands = new Array(numOp);
    var newElement, newTextNode, opChar, answer;
    var place = document.getElementById("test");
    switch (op) { // print correct operator
        case 1:
            opChar = "+";
            break;
        case 2:
            opChar = "-";
            break;
        case 3:
            opChar = "*";
            break;
        case 4:
            opChar = "/";
            break;
    }

    for (var i = 0; i < numq; i++) {
        var plusAns = 0;
        var minAns = 0;
        var timAns = 0;
        var divAns = 0;

        switch (op) {
            case 1:
                operands = getPlusOperands(numDig, numOp);
                break;
            case 2:
                operands = getMinusOperands(numDig, numOp);
                break;
            case 3:
                operands = getTimesOperands(numDig, numOp);
                break;
            case 4:
                operands = getDivOperands(numDig, numOp);
                break;
        }

        for (b = 0; b < operands.length; b++) { // Replace this by putting in individual math functions!!!!!!!!!
            plusAns += operands[b];
            minAns -= operands[b];
            timAns *= operands[b];
            divAns /= operands[b];
            if (b === 1) {
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
        newElement.setAttribute("type", "number");
        newElement.id = "input" + (i + 1);
        answer = 0;
        switch (op) { // work out the answer!
            case 1: // plus
                answer = plusAns;
                break;
            case 2: // minus
                answer = minAns;
                break;
            case 3: // times
                answer = timAns;
                break;
            case 4: // divide
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
        } else {
            //Perfect?
            if (streak === numberOfQuestions) {
                perfectTest();
                alert('perfect');
            } else {
                alert('oh dear. Try again!');
            }
            //Finish exercise
            streak = 0;
            $("#test").children().not("#streak").remove();
            $("#streak").text(0);
            $('#test').hide();
            $('#welcome').show();
        }

    }
}

function perfectTest() {
    // add 1 to perfects
    // if perfects = 5, set to 0 and level up avatar (unless end of Story!)
    // add 1 to iterations done
    var newPerf = perfects;
    var newAv = avatar_lvl;
    var newCash = cash_won + 100;
    if (parseInt(welcomedata.perfects) < 4) {
        perfects +=1;
        welcomedata.perfects = perfects;
        newPerf = perfects;
    } else { // avatar level up
        welcomedata.perfects = 0;
        newPerf = 0;
        if (parseInt(welcomedata.avatar_lvl) === 4) {
            alert("You have completed the whole STORY!!!\n\nYou win SUPER BONUS 1000 won!!!!!!!!");
            newCash += 1000;
        } else {
            alert("Congratulations! Your avatar is level up!\n\nYou win bonus money: 200 won!!!");
            newCash += 200;
        }
        alert("current avatar level: " + avatar_lvl);
        avatar_lvl += 1;
        newAv = avatar_lvl;
        welcomedata.avatar_lvl = newAv;
    }
    cash_won = newCash;
    welcomedata.cash_won = cash_won;

    var myUrl = "addIteration.php?user=" + chosenUser + "&storyid=" + chosenStoryId + "&exerciseid=" + exId + "&newiteration=" + (parseInt(itDone) + 1);
    myUrl += "&newperf=" + newPerf + "&newav=" + newAv + "&newcash=" + newCash;
    exercisedata[exIndex].iterations_done = itDone + 1;
    setWelcomeData();
    // alert (myUrl);
    $.ajax({
        url: myUrl,
        success: function (data) {
            alert("success if 1: " + data);
        },
        fail: function () {
        }
    });
}