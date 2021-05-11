<?php 
include "dbcon.php";

$data = stripslashes(file_get_contents("php://input"));
//to make associative array
$mydata =json_decode($data,true);
$id =$mydata['sid'];

$sql="SELECT * FROM student WHERE id={$id}";
$result=$conn->query($sql);
$row=$result->fetch_assoc();

//for response of ajax call
// echo json_encode($row);
echo json_encode($row);

?>
