<?php 
include "dbcon.php";
//  stripslashes function can be used to clean up data retrieved from a database or from an html form.

// php://input - This is a read-only stream that allows us to read raw data from the request body. It returns all the raw data after the HTTP-headers of the request, regardless of the content type

// json_decode - it takes a json string and convert it into a php object or array, if true the associative array

$data = stripslashes(file_get_contents("php://input"));

$mydata =json_decode($data,true);

$sid = $mydata['id'];
$name = $mydata['name'];
$email = $mydata['email'];
$password = $mydata['password'];

// //check input value and insert data in database
// if(!empty($name) && !empty($email) && !empty($password)){
//     //quote is required with variable in SQL values 
//     $sql = "INSERT INTO student (name,email,password) values('$name','$email','$password')";
//     if($conn->query($sql)==true){
//         echo "Student saved successfully";
//     }
//     else{
//         echo "Unable to save student";
//     }
// }else{
//     echo "fill all fields";
// }


//check input value and insert data in database
if(!empty($name) && !empty($email) && !empty($password)){
    //quote is required with variable in SQL values 
    $sql = "INSERT INTO student (id,name,email,password) values('$sid','$name','$email','$password') on duplicate key update name='$name',email='$email',password='$password'";
    
    if($conn->query($sql)==true){
        echo "Student saved successfully";
    }
    else{
        echo "Unable to save student";
    }
}else{
    echo "fill all fields";
}


?>