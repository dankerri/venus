/*
 ajax function  
*/
$(document).ready(function(){

	// like button update
	$(".like-icon").click(function() {
		var author_name = $(this).prev().html();
		var like_num = $(this).next();

		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {
				author : author_name, 
			},
			url: '../server.php',
			success: function(data) {
				var current_num = parseInt(like_num.html()) + 1;
				like_num.html(current_num);
			}
		});
	});

});
