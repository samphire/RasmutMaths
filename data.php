<?php

header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

$allData = array();
$welcome = array();
$exercises = array();

$conn = mysqli_connect("127.0.0.1", "root", "Fk!i=a0@:K", "panscopic") or die("cannot connect");

/*$sql="SELECT tbl_user.*, tbl_user_has_tbl_story.avatar_lvl, tbl_user_has_tbl_story.perfects, tbl_user_has_tbl_story.cash_won, tbl_user_has_tbl_story.cash_paid, tbl_story.name AS story_name, tbl_story.description
      FROM (tbl_user_has_tbl_story INNER JOIN tbl_story ON tbl_user_has_tbl_story.tbl_story_id = tbl_story.id) INNER JOIN tbl_user ON tbl_user_has_tbl_story.tbl_user_id = tbl_user.id
      WHERE tbl_user.id=".$_GET['userid'];
  */

// WELCOME DATA
$sql="SELECT tbl_user.*, tbl_user_has_tbl_story.avatar_lvl, tbl_user_has_tbl_story.perfects, tbl_user.cash_earned, tbl_user.cash_paid, tbl_story.name AS story_name, tbl_story.description, tbl_avatars.name AS avatar_name
              FROM (tbl_user_has_tbl_story INNER JOIN tbl_story ON tbl_user_has_tbl_story.tbl_story_id = tbl_story.id)
              INNER JOIN tbl_user ON tbl_user_has_tbl_story.tbl_user_id = tbl_user.id
              INNER JOIN tbl_avatars ON tbl_avatars.id = tbl_user_has_tbl_story.tbl_avatars_id
              WHERE tbl_user.id='".$_GET['userid']."'";
$result1=mysqli_query($conn, $sql);
while($r = mysqli_fetch_assoc($result1)){
    $welcome['welcomeData'][] = $r;
}

// POPULATE SCORES TABLE IF THERE IS NOTHING THERE
$sql = "SELECT * from tbl_scores WHERE user='{$_GET['userid']}'";
if(mysqli_num_rows(mysqli_query($conn, $sql)) < 1){
    echo "no rows returned. nothing in scores";
    $newStoryId = mysqli_query($conn, "SELECT `tbl_story_id` AS story FROM `tbl_user_has_tbl_story` WHERE tbl_user_id ='{$_GET['userid']}'")->fetch_object()->story;
    echo $newStoryId;
    $sql = "SELECT * FROM tbl_story_has_tbl_exercise WHERE tbl_story_id=$newStoryId";
    $result = mysqli_query($conn, $sql);
    while(list(,$exercise) = mysqli_fetch_row($result)){
        $sql="INSERT INTO `tbl_scores` (`user`, `tbl_story_has_tbl_exercise_tbl_story_id`, `tbl_story_has_tbl_exercise_tbl_exercise_id`, `iterations_done`)
        VALUES ('".$_GET['userid']."', '".$newStoryId."', '".$exercise."', '0')";
        echo "\n\n" . $sql;
        mysqli_query($conn, $sql);
    }
}

// EXERCISE DATA
$sql="SELECT tbl_scores.User AS userid, tbl_story_has_tbl_exercise.tbl_story_id AS storyid, tbl_story_has_tbl_exercise.tbl_exercise_id AS exerciseid,
        tbl_exercise.name AS exercisename, tbl_exercise.description AS exercisedescription, tbl_story_has_tbl_exercise.iterations,
        tbl_exercise.numOfDigits AS num_of_digits, tbl_exercise.numOfOperands, tbl_story_has_tbl_exercise.num_of_qns, tbl_exercise.tbl_operator_id AS operatorid,
        tbl_operator.name AS operatorname, tbl_exercise.btnImage AS btn_image, tbl_scores.iterations_done, tbl_exercise.time_limit
      FROM ((tbl_story_has_tbl_exercise INNER JOIN tbl_exercise ON tbl_story_has_tbl_exercise.tbl_exercise_id = tbl_exercise.id)
      LEFT JOIN tbl_scores ON (tbl_story_has_tbl_exercise.tbl_story_id = tbl_scores.tbl_story_has_tbl_exercise_tbl_story_id)
      AND (tbl_story_has_tbl_exercise.tbl_exercise_id = tbl_scores.tbl_story_has_tbl_exercise_tbl_exercise_id))
      INNER JOIN tbl_operator ON tbl_exercise.tbl_operator_id = tbl_operator.id
      WHERE tbl_scores.user='".$_GET['userid']."'";
$result2=mysqli_query($conn, $sql);
while($r = mysqli_fetch_assoc($result2)){
$exercises['exerciseData'][] = $r;
}

// PUT IT ALL TOGETHER
$allData['allData'][] = $welcome;
$allData['allData'][] = $exercises;
print json_encode($allData);
