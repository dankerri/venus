<?php
	include_once("db.php");

	$conn = db_connect();
	if($conn->connect_error) {
		die("connection failed");
	}

	$sql = 
	"UPDATE info " .
	"SET like_num = like_num + 1 WHERE author='" . $_POST["author"] . "';";


	if($conn->query($sql) === TRUE) {
		$return = "successed";
	} else {
		$return = $conn->error;
	}
	$array = array(
		"return" => $return,
	);
	echo(json_encode($array));

	$conn->close();
?>