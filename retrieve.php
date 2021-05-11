<?php 
include "dbcon.php";

// retrieve data from database
$sql = "Select * from student";

if($result =$conn->query($sql)){
    if($result->num_rows>0){
        $data= array();
        while($row=$result->fetch_assoc()){
            $data[]=$row;
        }
    }
}

// retreving json format data as response to ajax call
echo json_encode($data);
?>