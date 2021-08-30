<?php
$conn = mysqli_connect("127.0.0.1", "root", "admin", "panscopic") or die("cannot connect");

// ####### INSERT OR UPDATE TIME DATA #######
$sql = "SELECT `time` from `user_tt_times` where `user_id`='" . $_GET['userid'] . "' and `number`=" . $_GET['number'];
$result = mysqli_query($conn, $sql);
if (mysqli_affected_rows($conn) > 0) { // record exists, so check if time is faster
    if ((int) $_GET['time'] < $result->fetch_row()[0]) { // if true, time is faster, so update
        $sql = "UPDATE `user_tt_times` SET `time` = '" . $_GET['time'] . "' WHERE (`user_id` = '" . $_GET['userid'] . "') and (`number` = '" . $_GET['number'] . "')";
        $result = mysqli_query($conn, $sql);
//print "\naffected rows: " . mysqli_affected_rows($conn);
    }
} else { // SELECT query returned nothing, so no record yet, so insert
    $sql = "INSERT INTO `user_tt_times` (`user_id`, `number`, `time`) VALUES('" . $_GET['userid'] . "', '" . $_GET['number'] . "', '" . $_GET['time'] . "')";
    $result = mysqli_query($conn, $sql);
// print "\naffected rows: " . mysqli_affected_rows($conn);
}

// ####### FIND AND SET THE AVERAGE TIME #######
$sql = "SELECT user_id, avg(time) from user_tt_times where user_id='" . $_GET['userid']."'";

$result = mysqli_query($conn, $sql);
$value = $result->fetch_row()[1] ?? false;
$sql = "UPDATE `tbl_user` SET `avge_time` = '$value' WHERE (`id` = '" . $_GET['userid'] . "')";
mysqli_query($conn, $sql);
// print "\naffected rows: " . mysqli_affected_rows($conn);

// ####### FIND PERC TT DONE IF OP IS 6
if ($_GET['op'] == 6) {
    $sql = "SELECT round(count(user_id)/.08) from (SELECT user_id, count(user_id) FROM user_tt_times group by number having `user_id`='" . $_GET['userid'] . "') as bob";
    $result = mysqli_query($conn, $sql);
// print "\naffected rows: " . mysqli_affected_rows($conn);
    $value = $result->fetch_row()[0] ?? false;

    $sql = "UPDATE `tbl_user` SET `perc_tt_done` = '$value' WHERE (`id` = '" . $_GET['userid'] . "')";
    mysqli_query($conn, $sql);
//print "\naffected rows: " . mysqli_affected_rows($conn);
}

// ####### FIND PERC TT PASSED AT TIME LIMIT #######
$sql = "SELECT round(count(`user_id`)/.08) FROM `user_tt_times` WHERE `user_id`='" . $_GET['userid'] . "' AND `time` < " . $_GET['timelimit'];
$result = mysqli_query($conn, $sql);
$value = $result->fetch_row()[0] ?? false;

// ####### UPDATE PASSED AT MARK 1 #######
if ($_GET['op'] == 8) {
    $sql = "UPDATE `tbl_user` SET `perc_tt_passed_at_mark1` = '$value' WHERE `id`='" . $_GET['userid']."'";
    mysqli_query($conn, $sql);
}

// ####### UPDATE PASSED AT MARK 2 #######
if ($_GET['op'] == 10) {
    $sql = "UPDATE `tbl_user` SET `perc_tt_passed_at_mark2` = '$value' WHERE `id`='" . $_GET['userid']."'";
    mysqli_query($conn, $sql);
}

// ####### UPDATE PASSED AT 1 MONTH #######
if ($_GET['op'] == 12) { // 1 month - final test
    $sql = "UPDATE `tbl_user` SET `perc_tt_passed_at_1month` = '$value' WHERE `id`='" . $_GET['userid']."'";
    mysqli_query($conn, $sql);
}
