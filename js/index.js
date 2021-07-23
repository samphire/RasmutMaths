/**
 * Created by matthew on 7/7/2016.
 */

var sound, sound2, sound3, sound4, sound5, sound6, sound7;

function playBuzz() {
    sound.play();
}

function soundWrong() {
    sound2.play();
}

function soundRight() {
    sound3.play();
}

function soundLevelUp() {
    sound4.play();
}

function soundStoryDone() {
    sound5.play();
}

function soundPerfect() {
    sound6.play();
}

function soundSad() {
    sound7.play();
}

$(document).ready(function () {
    sound = new buzz.sound("assets/sound/bells-1-half.mp3");
    sound2 = new buzz.sound("assets/sound/saliva-2.mp3");
    sound3 = new buzz.sound("assets/sound/success.mp3");
    sound4 = new buzz.sound("assets/sound/levelup.mp3");
    sound5 = new buzz.sound("assets/sound/storydone.mp3");
    sound6 = new buzz.sound("assets/sound/perfect.mp3");
    sound7 = new buzz.sound("assets/sound/sadtrumpet.mp3");
    //fetchData(localStorage.getItem("user"));
    fetchData(2);
    $('#test').hide();
});


function fetchData(userid) {
    console.log("user is " + userid);
    $.ajax({
        url: 'data.php?userid=' + userid,
        datatype: 'json',
        success: function (data) {
            console.log(data);
            var myData = (JSON.parse(data));
            welcomedata = myData.allData[0].welcomeData[0];
            exercisedata = myData.allData[1].exerciseData;
            chosenUser = welcomedata.id;
            chosenStory = welcomedata.story_name;
            try {
                chosenStoryId = exercisedata[0].storyid;
            } catch (e) {
                console.log("no data for exercies");
            } finally {
                avatar_lvl = parseInt(welcomedata.avatar_lvl);
                perfects = parseInt(welcomedata.perfects);
                cash_won = parseInt(welcomedata.cash_earned);
                cash_paid = parseInt(welcomedata.cash_paid);
                avatar_name = welcomedata.avatar_name;
                setWelcomeData();
            }
        },
        fail: function () {
            alert('fail');
        }
    });
}

function postData(userid, number, time) {
    console.log("attempting to post data with userid " + userid);
    $.ajax({
        url: 'postTimes.php?userid=' + userid + '&number=' + number + '&time=' + time + '&op=' + operator + '&timelimit=' + timeLimit,
        success: function (data) {
            console.log("success posting data");
            console.log(data);
        },
        fail: function () {
            alert('failed to post times table time data');
        }
    })
}

// user information
var welcomedata, exercisedata;
var chosenUser, chosenStory, chosenStoryId, avatar_lvl, perfects, cash_won, cash_paid, avatar_name;
// exercise information
var exId, itDone, exIndex, btnImage, timeLimit, operator;
var a, b, c;
var numberOfQuestions;
var streak = 0;

function makeTest(numDig, numOp, op, numq, exid, itdone, exindex, btnimage, timelimit) { // Number of digits in the operands, number of operands, operator, number of questions,
    exId = exid;                                                              // exercise id, iterations done, array index of exercise, btnImage ( for times tables)
    itDone = itdone;
    exIndex = exindex;
    numberOfQuestions = numq;
    btnImage = btnimage;
    timeLimit = timelimit;
    operator = op;
    let timesTableOp = 0;
    let opArr = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    opArr.sort(() => Math.random() - 0.5);
    var operands = new Array(numOp);
    var newElement, newTextNode, opChar, answer;
    var place = document.getElementById("test");
    let stopwatchHtml = '<div class="stopwatch"><div class="circle"><span class="time" id="display">0:00</span></div></div>';

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
        case 5:
        case 7:
        case 9:// THIS IS FOR TIMES TABLES MULTIPLY
            opChar = "/"
            break;
        case 6:
        case 8:
        case 10:
        case 12:// THIS IS FOR TIMES TABLES DIVIDE
            opChar = "*"
            place.insertAdjacentHTML("afterbegin", stopwatchHtml);
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
            case 5:
            case 7:
            case 9:
                operands = getTimesTableOperandsDivide(numDig, numOp, btnImage, opArr[timesTableOp]);
                timesTableOp = timesTableOp < 10 ? timesTableOp += 1 : 2;
                start();
                break;
            case 6:
            case 8:
            case 10:
            case 12:
                operands = getTimesTableOperandsMultiply(numDig, numOp, btnImage, opArr[timesTableOp]);
                timesTableOp = timesTableOp < 10 ? timesTableOp += 1 : 2;
                start();
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
            case 5:
            case 7:
            case 9: // divide times table
                answer = divAns;
                break;
            case 6:
            case 8:
            case 10:
            case 12: // divide times table
                answer = timAns;
                break;
        }
        newElement.setAttribute('data-result', answer);
        newElement.addEventListener("keydown", checkResult);
        place.appendChild(newElement);
        place.appendChild(document.createElement("br"));
        $('#welcome').hide();
        $('#test').show();
        $('input:first-of-type').focus();
        window.scrollBy(0, 0 - window.pageYOffset);
    }
}

function checkResult(event) {
    clearInterval(timerInterval); // why is this here?
    if (event.keyCode === 13) {
        if (this.getAttribute('data-result') === this.value) {
            this.style.backgroundColor = "rgba(10,255,10,0.5)";
            streak += 1;
            soundRight();
        } else {
            streak = 0;
            this.style.backgroundColor = "rgba(255,10,10,0.5)";
            soundWrong();
            quitExercise();
            return;
        }
        var nextQ = parseInt(this.id.slice(5)) + 1;
        if (nextQ <= numberOfQuestions) {
            document.getElementById('input' + nextQ).focus();
            // swal({
            //     title: "" + streak,
            //     text: "",
            //     timer: 1000,
            //     showConfirmButton: false
            // });
            var swScroll = window.pageYOffset + 260;
            var topVal = "" + swScroll + "px";
            $(".sweet-alert").css({"top": topVal, "width": "30%", "left": "31%", "height": "3.4rem"});
            $(".sweet-overlay").css("height", "3000px");
        } else {
            //Perfect?
            console.log("avgTime is: " + avgTime);
            console.log("time limit is: " + timeLimit);
            let passTimer = 2 > 1;
            if (timeLimit != null) {
                passTimer = Math.floor(avgTime) < timeLimit;
            }
            console.log("passTimer is: " + passTimer);
            console.log("operator is: " + operator);
            if (streak === numberOfQuestions && passTimer) {
                perfectTest();
            } else {
                if (!passTimer) {
                    console.log("tryingsweealert");
                    // swal({
                    //         title: welcomedata.name,
                    //         text: "You failed\nYour average response time was " + Math.floor(avgTime) + "\nThe time limit was " + timeLimit,
                    //         imageSize: "100x100",
                    //         timer: 4000,
                    //         showConfirmButton: true,
                    //         imageUrl: "assets/img/coin2.png",
                    //         closeOnConfirm: false
                    //     });
                    cuteAlert({
                        type: "error",
                        title: "Sorry",
                        message: "У вас вышло время",
                        buttonText: "ㅠㅠ"
                    })
                    soundSad();
                }
            }
            quitExercise();
        }
    }
}

function quitExercise() {
    //Finish exercise
    streak = 0;
    $("#test").children().not(".stopwatch").remove();
    $('#test').hide();
    $('#welcome').show();
}

function perfectTest() {
    // alert("average time per question is: " + Math.floor(avgTime));
    soundPerfect();
    if (operator === 6 || operator === 8 || operator === 10 || operator === 12) {  // only if you are doing times table
        postData(chosenUser, timesTableNumber, Math.floor(avgTime));
    }
    swal({
        title: welcomedata.name,
        text: "высший балл!\nУ тебя все хорошо!\nВаша награда - ₩50!",
        imageSize: "100x100",
        timer: 4000,
        showConfirmButton: false,
        imageUrl: "assets/img/coin2.png"
    });

    var newPerf = perfects;
    var newAv = avatar_lvl;
    var newCash = cash_won + 50;
    if (parseInt(welcomedata.perfects) < 4) {
        perfects += 1;
        welcomedata.perfects = perfects;
        newPerf = perfects;
    } else { // avatar level up
        perfects = 0;
        welcomedata.perfects = perfects;
        newPerf = 0;
        if (parseInt(welcomedata.avatar_lvl) === 4) {
            // swal({
            //     title: welcomedata.name,
            //     text: "You have completed the whole STORY!!!\n\nYou win SUPER BONUS 1000 won!!!!!!!!",
            //     imageSize: "240x240",
            //     timer: 16000,
            //     showConfirmButton: false,
            //     imageUrl: "assets/img/storydone.gif"
            // });
            // soundStoryDone();
            // newCash += 1000;
        } else {
            swal({
                title: welcomedata.name,
                text: "Congratulations! Your avatar is upgraded!\n\nYou win bonus money: 100 won!!!",
                imageSize: "150x150",
                timer: 4000,
                showConfirmButton: false,
                imageUrl: "assets/img/2coins50px.png"
            });
            soundLevelUp();
            newCash += 100;
        }
        avatar_lvl += 1;
        newAv = avatar_lvl;
        welcomedata.avatar_lvl = newAv;
    }
    cash_won = newCash;
    welcomedata.cash_won = cash_won;
    exercisedata[exIndex].iterations_done = itDone + 1;
    setWelcomeData();
    // MyIterationsDone += 1;
    console.log(MyIterationsDone);
    var myUrl = "addIteration.php?user=" + chosenUser + "&storyid=" + chosenStoryId + "&exerciseid=" + exId + "&newiteration=" + (parseInt(itDone) + 1);
    myUrl += "&newperf=" + newPerf + "&newav=" + newAv + "&newcash=" + newCash;
    if (MyIterationsDone === MyIterations) { // Story is complete
        myUrl += "&story_complete=true";
    } else {
        myUrl += "&story_complete=false";
    }
    console.log(myUrl);
    $.ajax({
        url: myUrl,
        success: function (data) {
            data = parseInt(data);
            console.log(data);
            console.log(typeof data);
            if (data === 1) {
                console.warn("Story is complete");
                soundStoryDone();
                newCash += 1000;
                swal({
                        title: welcomedata.name,
                        type: null,
                        text: "Отличная работа! Вы завершили эту часть. \nУдачи со следующей частью ... Вы получаете 1000 в награду!!!",
                        imageSize: "150x150",
                        timer: 16000,
                        showConfirmButton: false,
                        imageUrl: "assets/img/storydone.gif",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function () {
                        // location.reload();
                    });
            }
            if (data === -1) {
                console.warn("There are no more tests... everything is complete");
                soundStoryDone();
                swal({
                    title: welcomedata.name,
                    type: null,
                    text: "Тестов больше нет...\n Вы ВСЕ прошли!",
                    imageSize: "150x150",
                    timer: 16000,
                    showConfirmButton: false,
                    imageUrl: "assets/img/danceydog.gif",
                    closeOnConfirm: false,
                    closeOnCancel: false
                });
            }
        },
        fail: function () {
            console.log("failure in ajax...");
        }
    });
}
