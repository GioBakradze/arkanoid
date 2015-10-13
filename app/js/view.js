import THREE from 'three';
import board from './board';

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var center = new THREE.Vector3( 0, 0, 0 );

// ########################################
// create point light like a light bulb
var light = new THREE.PointLight(0xffffff);
light.position.set( 50, 50, 250 );
scene.add( light );

// ########################################
// create moving ball
var cubeGeometry = new THREE.CubeGeometry(5, 5, 5);
var cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0x1ec876
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// ########################################
// create borders
for (var i in board.borders) {
    var b = board.borders[i];
    var geometry = new THREE.BoxGeometry(b.width, b.height, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0x00afff
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.x = b.x;
    cube.position.y = b.y;
    cube.position.z = 0;
    scene.add(cube);
}

// ########################################
// create camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;
scene.add(camera);


// ########################################
// some random events
camera.lookAt(center);
var clock = new THREE.Clock();
var pos = 0;
var posX = 0;

function render() {
    renderer.render(scene, camera);
    camera.position.x = posX;
    camera.position.y = pos;
    camera.lookAt(center);
    window.requestAnimationFrame(render);
}

var next = null;
document.addEventListener('mousemove', function(e) {
    if (!!next) {
        pos = e.clientX - next > 0 ? pos + 1 : pos - 1;
        posX = e.clientX - next > 0 ? pos + 1 : pos - 1;
        // console.log(pos);
    }
    next = e.clientX;
}, false);

render();
