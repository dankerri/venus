<?php
	include_once("db.php");

	//make sure you have permission control dir /source

	$data = $_POST['data'];
	$data = substr($data,strpos($data,",")+1);
	$data = base64_decode($data);

	$img_date = date("Y-m-d-H:i:s");
	$file = './source/'.$img_date.'.png';
	file_put_contents($file, $data);
	echo "Success!";

?>