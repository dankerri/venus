<?php
	include_once("db.php");

	// make sure you have permission control dir /source

	//Save data as image
	$data = $_POST['data'];
	$data = substr($data,strpos($data,",")+1);
	$data = base64_decode($data);

	$img_date = date("Y-m-d-H:i:s");
	$file = './source/'.$img_date.'.png';
	file_put_contents($file, $data);

	// Update database
	$conn = db_connect();
	if($conn->connect_error) {
		die("connection failed");
	}

	$sql = 
	"INSERT INTO info (author, file_name) VALUES('".$_POST['author']."','".$img_date.".png')";


	$return;
	if($conn->query($sql) === TRUE) {
		$return = "successed";
	} else {
		$return = $conn->error;
	}
	// $array = array(
	// 	"return" => $return,
	// );
	// echo(json_encode($array));
	echo($return);

	$conn->close();

?>