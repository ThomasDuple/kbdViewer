const scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load( 'texturekeycap.jpg' );
const material = new THREE.MeshBasicMaterial( { map : texture } );
var colorcase = new THREE.MeshBasicMaterial( {color: 0xFFBCBC} );

function renderkey(x,y,width,length,keytxt) {
    var pyramidtes = new THREE.CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 2 ); 
    pyramidtes.rotateY( Math.PI / 4 );
    pyramidtes = pyramidtes.toNonIndexed(); 
    pyramidtes.computeVertexNormals(); 
    var meshpyr = new THREE.Mesh( pyramidtes, material );
    meshpyr.scale.set( width,3, length );
    scene.add(meshpyr);
    meshpyr.position.y = 3.2; 
    meshpyr.position.x= x; 
    meshpyr.position.z= y; 

    var pyrabox = new THREE.Box3().setFromObject( meshpyr );

    pyrabox.getCenter();

    let keywidth = pyrabox.getSize().x;
    let keyheight = pyrabox.getSize().y;
    console.log("keycaps:");

    console.log(meshpyr.position.x,meshpyr.position.z);

    getkeytxt( meshpyr.position.x,meshpyr.position.z,keywidth,keyheight,keytxt);
}


function getkeytxt(keyx,keyy,keywidth,keyheight,keytxt) {
    
const loader = new THREE.FontLoader();
loader.load( 'crimson_regular.json', function ( font ) {

    const materialcube = new THREE.MeshBasicMaterial( {color: 0xFFFFF} );

	const textgeometry = new THREE.TextGeometry( keytxt, {
		font: font,
		size: 1,
		height: 0,
		curveSegments: 5
	
	} );
    
    const texte = new THREE.Mesh( textgeometry, materialcube );
    console.log('textescale : ');

    console.log( )

    texte.position.x=keyx-texte.scale.x/2.9;
    texte.position.z=keyy+texte.scale.y/4;
    texte.position.y=4.73;
    texte.rotation.x=-Math.PI/2;
    scene.add( texte ); 

} );

}
renderkey(2,9,3,3,'_');

const geometrycube = new THREE.BoxGeometry( 3.20, 0.5, 1.20  );
const kbdcase = new THREE.Mesh( geometrycube, colorcase );
kbdcase.scale.set( 50, 9, 50 );
scene.add( kbdcase );

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.z = 1;
camera.position.set( 100,120, -100  );
camera.lookAt( 0, 0, 0 );
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxDistance = 350;
controls.minDistance = 20;
controls.update();

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    controls.update();
}

animate();