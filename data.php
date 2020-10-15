<?php
$conn = mysqli_connect("127.0.0.1", "root", "admin", "sammath") or die("cannot connect");
$sql="SELECT tbl_user.*, tbl_user_has_tbl_story.avatar_lvl, tbl_user_has_tbl_story.perfects, tbl_user_has_tbl_story.cash_won, tbl_user_has_tbl_story.cash_paid, tbl_story.name AS story_name, tbl_story.description
      FROM (tbl_user_has_tbl_story INNER JOIN tbl_story ON tbl_user_has_tbl_story.tbl_story_id = tbl_story.id) INNER JOIN tbl_user ON tbl_user_has_tbl_story.tbl_user_id = tbl_user.id
      WHERE tbl_user.id=".$_GET['userid'];
$result1=mysqli_query($conn, $sql);

$sql="SELECT tbl_scores.User AS userid, tbl_story_has_tbl_exercise.tbl_story_id AS storyid, tbl_story_has_tbl_exercise.tbl_exercise_id AS exerciseid, tbl_exercise.name AS exercisename, tbl_exercise.description AS exercisedescription, tbl_story_has_tbl_exercise.iterations, tbl_exercise.numOfDigits AS num_of_digits, tbl_exercise.numOfOperands, tbl_story_has_tbl_exercise.num_of_qns, tbl_exercise.tbl_operator_id AS operatorid, tbl_operator.name AS operatorname, tbl_exercise.btnImage AS btn_image, tbl_scores.iterations_done
      FROM ((tbl_story_has_tbl_exercise INNER JOIN tbl_exercise ON tbl_story_has_tbl_exercise.tbl_exercise_id = tbl_exercise.id) LEFT JOIN tbl_scores ON (tbl_story_has_tbl_exercise.tbl_story_id = tbl_scores.tbl_story_has_tbl_exercise_tbl_story_id) AND (tbl_story_has_tbl_exercise.tbl_exercise_id = tbl_scores.tbl_story_has_tbl_exercise_tbl_exercise_id)) INNER JOIN tbl_operator ON tbl_exercise.tbl_operator_id = tbl_operator.id WHERE tbl_scores.User=".$_GET['userid'];
$result2=mysqli_query($conn, $sql);

$allData = array();
$welcome = array();
$exercises = array();
while($r = mysqli_fetch_assoc($result1)){
$welcome['welcomeData'][] = $r;
}
while($r = mysqli_fetch_assoc($result2)){
$exercises['exerciseData'][] = $r;
}
//array_push($allData, $welcome, $exercises);
$allData['allData'][] = $welcome;
$allData['allData'][] = $exercises;
print json_encode($allData);
?>