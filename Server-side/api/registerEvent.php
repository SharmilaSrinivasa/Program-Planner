<?php
require 'connect.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$postdata = file_get_contents("php://input");

print_r($postdata);

if (isset($postdata) && !empty($postdata)) {
    //Extract the data.
    $request = json_decode($postdata);

    //Sanitize.
    $event_id = $_GET['eventId'];
    $user_email = $request->user_email;

    $insertAttendee = "INSERT INTO AttendeeList (eventId, userEmail) VALUES ( '{$event_id}', '{$user_email}')";

    if ($conn->query($insertAttendee) === true) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $insertAttendee . "<br>" . $conn->error;
    }
}

$conn->close();
