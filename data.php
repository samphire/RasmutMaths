<?php
$conn = mysqli_connect("127.0.0.1", "root", "canal", "sammath") or die("cannot connect");
$sql="SELECT tbl_user.*, tbl_user_has_tbl_story.avatar_lvl, tbl_user_has_tbl_story.perfects, tbl_user_has_tbl_story.cash_won, tbl_user_has_tbl_story.cash_paid, tbl_story.name, tbl_story.description
      FROM (tbl_user_has_tbl_story INNER JOIN tbl_story ON tbl_user_has_tbl_story.tbl_story_id = tbl_story.id) INNER JOIN tbl_user ON tbl_user_has_tbl_story.tbl_user_id = tbl_user.id
      WHERE tbl_user.id=1;";
$result=mysqli_query($conn, $sql);
$rows = array();
while($r = mysqli_fetch_assoc($result)){
$rows['myData'][] = $r;
}
print json_encode($rows);
?>