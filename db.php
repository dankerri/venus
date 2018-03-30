<?php  
	function db_connect() {
		$servername = "localhost";
		$username = "root";
		$password = "j12345678j..";
		$dbname = "test";
		$tablename = "info";

		$conn = new mysqli($servername, $username, $password, $dbname);
		return $conn;
	}
?>