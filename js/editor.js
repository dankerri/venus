$(document).ready( function() {

	var cameram, scene, renderer;
	var orbit_controls, transform_controls;
	var gui;

	init( );
	render( );

	function init( ) {

		var canvas = document.getElementById( "canvas" );
		renderer = new THREE.WebGLRenderer( { canvas: canvas } );
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

}) ;