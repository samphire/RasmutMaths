<?php
$conn = mysqli_connect("127.0.0.1", "root", "admin", "sammath") or die("cannot connect");

$sql = "UPDATE tbl_scores SET tbl_scores.iterations_done=" . $_GET['newiteration'] .
" WHERE tbl_scores.user=". $_GET['user'] .
" AND tbl_scores.tbl_story_has_tbl_exercise_tbl_story_id=". $_GET['storyid'] .
" AND tbl_scores.tbl_story_has_tbl_exercise_tbl_exercise_id=" . $_GET['exerciseid'] . ";";

$result = mysqli_query($conn, $sql);

$sql = "UPDATE tbl_user_has_tbl_story SET tbl_user_has_tbl_story.avatar_lvl=". $_GET['newav'] .", tbl_user_has_tbl_story.perfects=". $_GET['newperf'] .
", tbl_user_has_tbl_story.cash_won=". $_GET['newcash'] ." WHERE tbl_user_has_tbl_story.tbl_user_id=".  $_GET['user']  ." AND tbl_user_has_tbl_story.tbl_story_id=". $_GET['storyid'] .";";

$result2 = mysqli_query($conn, $sql);

echo "result is: " . $result . ", " . $result2 . $sql;