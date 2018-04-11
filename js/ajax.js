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

	var canvas = document.getElementById("canvas");

	// Get the canvas screenshot as PNG
	var screenshot = Canvas2Image.saveAsPNG(canvas, true);

	// This is a little trick to get the SRC attribute from the generated <img> screenshot
	canvas.parentNode.appendChild(screenshot);
	screenshot.id = "canvasimage";		
	data = $('#canvasimage').attr('src');
	canvas.parentNode.removeChild(screenshot);


	// Send the screenshot to PHP to save it on the server
	var url = '../export.php';
	$.ajax({ 
	    type: "POST", 
	    url: url,
	    dataType: 'text',
	    data: {
				base64data : data
	    },
	    success: function(data) {
	    	console.log(data);
	    }
	});
}

});
