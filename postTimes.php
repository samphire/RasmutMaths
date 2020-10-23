<?php
$conn = mysqli_connect("127.0.0.1", "root", "admin", "sammath") or die("cannot connect");
$sql = "INSERT INTO `sammath`.`user_tt_times` (`user_id`, `number`, `time`) VALUES('".$_GET['userid']. "', '".$_GET['number']."', '".$_GET['time']."')";
print $sql;

$result1=mysqli_query($conn, $sql);
print "\naffected rows: " . mysqli_affected_rows($conn);