/**
 * Created by matthew on 7/20/2016.
 */

var MyIterations, MyIterationsDone;

function setWelcomeData() {
    MyIterations = 0;
    MyIterationsDone = 0;
    // Clear existing data
    $("#avatar").children().not("#progress").remove();
    $("#progress").children().remove();
    $("#choose").children().not("p").remove();
    
    var i;
    // Set User Info
    $("#userInfo").text(welcomedata.name);
    // Set Avatar and Perfects
    for (i = 0; i < 5; i++) {
        if (i < perfects) {
            $("#progress").append('<img src="assets/img/avatars/yona2.png">');
        } else {
            $("#progress").append('<img src="assets/img/avatars/yona2placeholder.png">');
        }
    }
    for (i = 0; i < 5; i++) {
        if (i < avatar_lvl) {
            $("#progress").before('<img src="assets/img/avatars/' + avatar_name + (i + 1) + '.png">');
        } else {
            $("#progress").before('<img src="assets/img/avatars/' + avatar_name + (i + 1) + 'placeholder.png">');
        }
    }

    // Set cash data
    $("#cash>table tr:first-of-type>td:nth-of-type(2)").html("&nbsp&nbsp&nbsp" + cash_won);
    $("#cash>table tr:nth-of-type(2)>td:nth-of-type(3)").html("&nbsp&nbsp&nbsp" + cash_paid);
    var owed = cash_won - cash_paid;
    $("#cash>table tr:nth-of-type(3)>td:nth-of-type(2)").html("&nbsp&nbsp&nbsp" + owed);

    // Set story information
    $("#story").html(chosenStory);


    // Set exercise data
    for (i = 0; i < exercisedata.length; i++) {
        MyIterations += Number(exercisedata[i].iterations);
        MyIterationsDone += Number(exercisedata[i].iterations_done);
        var opnum = "<div id='operator" + (i + 1) + "'>";
        if (exercisedata[i].iterations_done === exercisedata[i].iterations) {
            opnum += '<img src="assets/img/' + exercisedata[i].btn_image + '" class="operatorImg">';
        } else {
            opnum += '<img src="assets/img/' + exercisedata[i].btn_image + '" class="operatorImg" onclick="makeTest(' + exercisedata[i].num_of_digits + ',' + exercisedata[i].numOfOperands;
            opnum += ',' + exercisedata[i].operatorid + ',' + exercisedata[i].num_of_qns + ',' + exercisedata[i].exerciseid;
            opnum +=  ',' + exercisedata[i].iterations_done + ', '+ i +',\'' + exercisedata[i].btn_image + '\', ' + exercisedata[i].time_limit + ')">';
        }
        var iterations = parseInt(exercisedata[i].iterations);
        for (var j = 0; j < iterations; j++) {
            if (j < exercisedata[i].iterations_done) {
                opnum += '<img src="assets/img/tick2.png" class="iterationsTick">';
            } else {
                opnum += '<img src="assets/img/tick2placeholder.png" class="iterationsTick">';
            }
        }
        $("#choose").append(opnum);
    }
    console.log("MyIterations: " + MyIterations + "\nMyIterationsDone: " + MyIterationsDone);
}