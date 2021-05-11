<?php
    $db_localhost="localhost";
    $db_username="root";
    $db_password="";
    $db_dbname="ajaxphp";
    $conn = new mysqli($db_localhost,$db_username,$db_password,$db_dbname);

    if($conn->connect_error){
        die("connection failed");
    }
?>