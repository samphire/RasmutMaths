<?php
$conn = mysqli_connect("127.0.0.1", "root", "admin", "sammath") or die("cannot connect");



$sql = "UPDATE tbl_user_has_tbl_story SET tbl_user_has_tbl_story.avatar_lvl=". $_GET['newav'] .", tbl_user_has_tbl_story.perfects=". $_GET['newperf'] .
" WHERE tbl_user_has_tbl_story.tbl_user_id=".$_GET['user']." AND tbl_user_has_tbl_story.tbl_story_id=".$_GET['storyid'] .";";

$result2 = mysqli_query($conn, $sql);

$sql = "UPDATE tbl_user SET `cash_earned`=".$_GET['newcash']." WHERE id=".$_GET['user'];

$result3 = mysqli_query($conn, $sql);

if($_GET['story_complete'] == "true"){
$newStoryId = 1 + (int)$_GET['storyid'];
// update existing story to new one and reset variables
$sql = "UPDATE `sammath`.`tbl_user_has_tbl_story` SET `tbl_story_id` = '".$newStoryId."', `avatar_lvl` = '1', `perfects` = '0' WHERE (`tbl_user_id` = '".$_GET['user']."')";
$result = mysqli_query($conn, $sql);
print mysqli_affected_rows($conn);
// delete existing entries in tbl_scores and create new ones
$sql = "DELETE from tbl_scores where user=".$_GET['user'];
mysqli_query($conn, $sql);
$sql = "SELECT * FROM tbl_story_has_tbl_exercise WHERE tbl_story_id=$newStoryId";
$result = mysqli_query($conn, $sql);
while(list(,$exercise) = mysqli_fetch_row($result)){
$sql="INSERT INTO `tbl_scores` (`user`, `tbl_story_has_tbl_exercise_tbl_story_id`, `tbl_story_has_tbl_exercise_tbl_exercise_id`, `iterations_done`)
        VALUES ('".$_GET['user']."', '".$newStoryId."', '".$exercise."', '0')";
        mysqli_query($conn, $sql);
}
} else{
$sql = "UPDATE tbl_scores SET tbl_scores.iterations_done=" . $_GET['newiteration'] .
" WHERE tbl_scores.user=". $_GET['user'] .
" AND tbl_scores.tbl_story_has_tbl_exercise_tbl_story_id=". $_GET['storyid'] .
" AND tbl_scores.tbl_story_has_tbl_exercise_tbl_exercise_id=" . $_GET['exerciseid'] . ";";

$result = mysqli_query($conn, $sql);
}