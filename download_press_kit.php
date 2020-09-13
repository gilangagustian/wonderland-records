<?php
/**
 * Created by PhpStorm.
 * User: agustian
 * Date: 9/14/20
 * Time: 1:11 AM
 */

if (!isset($_POST['email']) || empty($_POST['email']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $response = array(
        'message' => 'Please enter a valid email address.'
    );

    header('HTTP/1.1 400 Bad Request');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode($response));
} else {
    try {
        $servername = "localhost";
        $username = "root";
        $password = "root";
        $dbname = "wont8199_wonderland_records";
        $mysqli = new mysqli($servername,$username,$password,$dbname);

        if ($mysqli->connect_errno) {
            throw new Exception("Failed to connect to MySQL: " . $mysqli->connect_error);
        }

        $sql = sprintf(
            "INSERT INTO download_logs (email) VALUES ('%s')",
            $mysqli->real_escape_string($_POST['email'])
        );

        if (!$mysqli->query($sql) === TRUE) {
            throw new Exception("Error: " . mysqli_error($mysqli));
        }

        $mysqli->close();

        $response = array(
            'message' => 'Successfully generate the press kit download link.'
        );

        header('HTTP/1.1 200 OK');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode($response));
    } catch (Exception $e) {
        $response = array(
            'message' => $e->getMessage()
        );

        header('HTTP/1.1 500 Internal Server Error');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode($response));
    }
}
