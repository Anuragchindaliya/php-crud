<?php 
include "dbcon.php";
$mydata = stripslashes(file_get_contents("php://input"));

$mydata=json_decode($mydata,true);

$id = $mydata['sid'];

$sql = "Delete from student where id = $id";


if(!empty($id)){
    // if($conn->query($sql)==true){
    //     echo "Record Deleted";
    // }else{
    //     echo "problem in query";
    // }
    if($conn->query($sql)==true){
        echo true;
    }else{
        echo false;
    }
}
else{
    echo "blank field";
}


?>
