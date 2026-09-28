<?php

$host = "localhost";
$username = "YOUR_DATABASE_USERNAME";
$password = "YOUR_DATABASE_PASSWORD";
$database = "COP4331";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error)
{
    die("Database connection failed");
}
?>
