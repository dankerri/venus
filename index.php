<!DOCTYPE html>
<html>
<head>
	<title>range compent</title>
	<link rel="stylesheet" type="text/css" href="./style.css">
	<script type="text/javascript" src="./js/jquery-3.3.1.min.js"></script>
	<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/solid.js" integrity="sha384-+Ga2s7YBbhOD6nie0DzrZpJes+b2K1xkpKxTFFcx59QmVPaSA8c7pycsNaFwUK6l" crossorigin="anonymous"></script>
	<script defer src="https://use.fontawesome.com/releases/v5.0.8/js/fontawesome.js" integrity="sha384-7ox8Q2yzO/uWircfojVuCQOZl+ZZBg2D2J5nkpLqzH1HY0C1dHlTKIbpRz/LG23c" crossorigin="anonymous"></script>
</head>
<body>
<div class="container">
	<div class="interaction-part"></div><!-- inferaction-part-->
	<div class="range-part">
		<?php  
			include_once('./db.php');
			$conn = db_connect();
			$rows = $conn->query("SELECT * FROM info ORDER BY like_num DESC");
			if($rows->num_rows > 0) {
				while($row = $rows->fetch_assoc()) {?>
					<div class="card">
						<img src="<?php echo($row["path"].$row["file_name"])?>">
						<div class="info">
							<p class="by">by</p>
							<p class="author"><?php echo($row["author"]); ?></p>
							<p class="like-icon"><i class="fas fa-heart like-icon"></i></p>
							<p class="like"><?php echo($row["like_num"]); ?></p>
							<p class="date"><?php echo($row["date"]); ?></p>
						</div>
					</div>
				<?php
				}
			} else {
				echo("<p>there has 0 post.</p>");
			}
		?>
	</div><!-- range-part -->
</div><!-- container -->
<script type="text/javascript" src="./js/ajax.js"></script>
</body>
</html>