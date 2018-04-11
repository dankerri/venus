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


	// $( ".screen-button" ).click( exportAndSaveCanvas() );

	// exportAndSaveCanvas = function() {

	// 	var canvas = document.getElementById("canvas");
	// 	var canvasData = canvas.toDataURL("image/png");

	// 	var url = '../export.php';

	// 	$.ajax({
	// 	    url: url, 

	// 	    type:'POST', 

	// 	    data:{

	// 	        data:canvasData

	// 	    },

	// 	    success: function(data) {
	// 	    	alert(data);
	// 	    }
	// 	});

	// }

	exportAndSaveCanvas = function () {

	// var canvasData = canvasElement.toDataURL("image/png");
	var canvasData = document.getElementById("canvas").toDataURL("image/png");

	var url = '../export.php';
	$.ajax({
	    url:'../export.php', 

	    type:'POST', 

	    data:{

	        data:canvasData

	    },
	    success: function( data ) {

	    	console.log( data );
	    }
	});

}

});
