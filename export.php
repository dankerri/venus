<?php

	// make sure you have permission control dir /source

	$data = $_POST['data'];
	$data = substr($data,strpos($data,",")+1);
	$data = base64_decode($data);

	$img_date = date("Y-m-d-H:i:s");
	$file = './source/'.$img_date.'.png';
	file_put_contents($file, $data);
	echo "Success!";

	// $data = $_REQUEST['base64data']; 
	// $image = explode('base64,',$data); 

	// $img_date = date("Y-m-d-H:i:s");
	// $img_path = "./source/";

	// file_put_contents($img_path.$img_date.'.png', base64_decode($image[1])); 
	// echo "success!";

?>