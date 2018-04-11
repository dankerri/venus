$(document).ready( function() {

	var cameram, scene, renderer;
	var orbit_controls, transform_controls;
	var gui;
	var canvas = document.getElementById( "canvas" );

	init( );
	render( );

	function init( ) {

		renderer = new THREE.WebGLRenderer( { 
			canvas: canvas,
			antialias: true,
			preserverDrawingBuffer : true
		} );
		renderer.setSize( window.innerWidth * 0.6 , window.innerHeight * 0.6 );
		// document.getElementById("editor").appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 100, 100, 100 );
		camera.lookAt( new THREE.Vector3( 0, 200, 0 ) );

		// Create Scene
		scene = new THREE.Scene( );
		scene.add( new THREE.GridHelper( 100, 10 ) );

		var light = new THREE.AmbientLight( ); // soft white light
		scene.add( light );

		var pointLight = new THREE.PointLight( 0xffffff, 2 );
		pointLight.position.set( 100, 0, 50 );
		camera.add( pointLight );

		// Control
		orbit_controls = new THREE.OrbitControls( camera, renderer.domElement );


		// Creat GUI control
		gui = new dat.GUI( );

		document.getElementById("editor").appendChild( gui.domElement );

		// Load Model
		var loader = new THREE.FBXLoader();

		loader.load(

			'./model/bone.fbx',
			// './model/venus.FBX',

			function( object ) {
				
				object.traverse( function( child ) {

						try {

							if ( child instanceof THREE.SkinnedMesh ) {

								child.material.wireframe = true;// For debug rotation of X

							}
							// console.log( child );

							if( child instanceof THREE.Bone ) {
									folder = gui.addFolder( child.name )
									folder.add( child.rotation, 'x', - Math.PI, Math.PI );
									folder.add( child.rotation, 'y', - Math.PI, Math.PI );
									folder.add( child.rotation, 'z', - Math.PI, Math.PI );
							}
						}

						catch( e ) {

							console.log( e );

						}

				} );

				var helper = new THREE.SkeletonHelper(object);

				scene.add(object);
				scene.add(helper);

			}
		);

		// event listen
		window.addEventListener( 'resize', onWindowResize );
	}

	function onWindowResize( ) {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix( );

		renderer.setSize( window.innerWidth * 0.6, window.innerHeight * 0.6 );

		render( );

	}


	function render() {

		requestAnimationFrame( render );
	  renderer.render( scene, camera );

	}

	// take screenshot
	exportAndSaveCanvas = function () {

		// var canvasData = document.getElementById("canvas").toDataURL("image/png");
		renderer.render( scene, camera )
		var canvasData = renderer.domElement.toDataURL("image/png");
		// console.log(renderer.domElement.toDataURL("image/png"));

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

	//For testing screenshot, it works
	// exportAndSaveCanvas = function() {
	// 	var w = window.open('', '');
 //    w.document.title = "Screenshot";
 //    //w.document.body.style.backgroundColor = "red";
 //    var img = new Image();
 //    // Without 'preserveDrawingBuffer' set to true, we must render now
 //    renderer.render(scene, camera);
 //    img.src = renderer.domElement.toDataURL();
 //    console.log( renderer.domElement.toDataURL() );
 //    w.document.body.appendChild(img);  
	// }

}) ;