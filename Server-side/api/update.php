<?php
require 'connect.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Get the posted data.
$postdata = file_get_contents("php://input");

//print_r($postdata);

if (isset($postdata) && !empty($postdata)) {
    //Extract the data.
    $request = json_decode($postdata);

    print_r($request);

    //Sanitize.
    $id = $_GET['id'];
    $title = $request->event_title;
    $event_date = $request->event_date;
    $event_time = $request->event_time;
    $location = $request->location;
    $description = $request->description;

    //update
    $sql = "UPDATE events SET title = '$title', event_date = '$event_date',
    event_time = '$event_time', location = '$location', description = '$description'
    WHERE eventId = '{$id}' LIMIT 1";

    if (mysqli_query($conn, $sql)) {
        http_response_code(204);
    } else {
        return http_response_code(422);
    }

}