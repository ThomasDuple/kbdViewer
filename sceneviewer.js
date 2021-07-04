const scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( {alpha: true} );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 

renderer.setSize( document.body.clientWidth*0.95 - document.getElementById("menu").clientWidth, document.body.clientHeight );
document.body.appendChild( renderer.domElement );
renderer.domElement.id = "Canvas3D";

const texture = new THREE.TextureLoader().load( 'texturekeycap.jpg' );
const material = new THREE.MeshBasicMaterial( { map : texture } );


var keys=[];
var kcaps ;
var kfont ;

function renderkey(x,y,width,length,keytxt) {
    var pyramidtes = new THREE.CylinderGeometry( 0.8 / Math.sqrt( 2 ), 1 / Math.sqrt( 2 ), 1, 4, 2 ); 
    pyramidtes.rotateY( Math.PI / 4 );
    pyramidtes = pyramidtes.toNonIndexed(); 
    pyramidtes.computeVertexNormals(); 
    
    var colorkc = new THREE.MeshBasicMaterial( {color: col_keycaps} );
    var meshpyr = new THREE.Mesh( pyramidtes, colorkc );
    meshpyr.scale.set( width,3, length );
    scene.add(meshpyr);
    meshpyr.position.y = 3.2; 
    meshpyr.position.x= x; 
    meshpyr.position.z= y; 

    kcaps =meshpyr;
   

    getkeytxt( meshpyr.position.x,meshpyr.position.z,keytxt);
    keys.push(keytxt);
}


function getkeytxt(keyx,keyy,keytxt) {
    
    const loader = new THREE.FontLoader();
    const materialcube = new THREE.MeshBasicMaterial( {color: col_text} );

    if (keytxt.length==1) {
loader.load( 'Fira.json', function ( font ) {
	const textgeometry = new THREE.TextGeometry( keytxt, {
		font: font,
		size: 1,
		height: 0,
		curveSegments: 5
	
	} );
    const texte = new THREE.Mesh( textgeometry, materialcube );
    texte.position.x=keyx-texte.scale.x/2.9;
    texte.position.z=keyy+texte.scale.y/4;
    texte.position.y=4.73;
    texte.rotation.x=-Math.PI/2;
    scene.add( texte ); 
} );
}
else{
    loader.load( 'crimson_regular.json', function ( font ) {
        const textgeometry = new THREE.TextGeometry( keytxt, {
            font: font,
            size: 0.5,
            height: 0,
            curveSegments: 5
        
        } );
        const texte = new THREE.Mesh( textgeometry, materialcube );
        kfont = texte;
        texte.position.x=keyx-texte.scale.x;
        texte.position.z=keyy+texte.scale.y/2;
        texte.position.y=4.73;
        texte.rotation.x=-Math.PI/2;
        scene.add( texte ); 
    } );
}
}

function drawCase() {
    var colorcase = new THREE.MeshBasicMaterial( {color: col_case} );
    let geometrycube = new THREE.BoxGeometry( 3.20, 0.5, 1.20  );
    let kbdcase = new THREE.Mesh( geometrycube, colorcase );
    kbdcase.scale.set(30, 9, 40 );
    kbdcase.position.x=47   ;
    kbdcase.position.z=10;

    scene.add( kbdcase );
}

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.z = 1;
camera.position.set( 100,120, -100  );
camera.lookAt( 0, 0, 0 );
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.maxDistance = 350;
controls.minDistance = 20;
controls.update();
function remove_all_3D() {
    console.log(keys.length); 
    console.log("length:", scene.children.length)
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        obj = scene.children[i];
        scene.remove(obj); 
   }   
    
}
 

    
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    controls.update();
}

animate();