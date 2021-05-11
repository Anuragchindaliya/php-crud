<?php
    $db_host="localhost";
    $db_username="root";
    $db_password="";
    $db_dbname="jqajax";
    $conn = new mysqli($db_host,$db_username,$db_password,$db_dbname);

    if($conn->connect_error){
        die("connection failed");
    }
?>