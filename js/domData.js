/**
 * Created by matthew on 7/20/2016.
 */
function setWelcomeData() {
    var i;
    // Set User Info
    $("#userInfo").text(welcomedata.name);
    // Set Avatar and Perfects
    for (i = 0; i < 5; i++) {
        if (i < perfects) {
            $("#progress").append('<img src="assets/img/avatars/girl/yona2.png">');
        } else {
            $("#progress").append('<img src="assets/img/avatars/girl/yona2placeholder.png">');
        }
    }
    for (i = 0; i < 5; i++) {
        if (i < avatar_lvl) {
            $("#progress").before('<img src="assets/img/avatars/girl/girl' + (i + 1) + '.png">');
        } else {
            $("#progress").before('<img src="assets/img/avatars/girl/girl' + (i + 1) + 'placeholder.png">');
        }
    }

    // Set cash data
    $("#cash>table tr:first-of-type>td:nth-of-type(2)").html("&nbsp&nbsp&nbsp" + cash_won);
    $("#cash>table tr:nth-of-type(2)>td:nth-of-type(3)").html("&nbsp&nbsp&nbsp" + cash_paid);
    var owed = cash_won - cash_paid;
    $("#cash>table tr:nth-of-type(3)>td:nth-of-type(2)").html("&nbsp&nbsp&nbsp" + owed);

    // Set exercise data
    for (i = 0; i < exercisedata.length; i++) {
        var opnum = "<div id='operator" + (i + 1) + "'>";
        opnum += '<img src="assets/img/' + exercisedata[i].btn_image + '" onclick="makeTest(' + exercisedata[i].num_of_digits + ',' + exercisedata[i].numOfOperands + ',' + exercisedata[i].operatorid + ',' + exercisedata[i].num_of_qns + ')">';
        var iterations = parseInt(exercisedata[i].iterations);
        for (var j = 0; j < iterations; j++) {
            if (j < exercisedata[i].iterations_done) {
                opnum += '<img src="assets/img/tick2.png">';
            } else {
                opnum += '<img src="assets/img/tick2placeholder.png">';
            }
        }
        $("#choose").append(opnum);
    }
}