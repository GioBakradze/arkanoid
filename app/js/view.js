import THREE from 'three';
import board from './board';

var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

// create cue
// var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
// var cubeMaterial = new THREE.MeshLambertMaterial({
//     color: 0x1ec876
// });
// var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.rotation.y = Math.PI * 45 / 180;
// scene.add(cube);

// create border with cubes
for (var i in board.borders) {
    var b = board.borders[i];

    var geometry = new THREE.BoxGeometry(b.width, b.height, 1);
    var material = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    var cube = new THREE.Mesh(geometry, material);

    cube.position.x = b.x;
    cube.position.y = b.y;
    cube.position.z = 0;
    scene.add(cube);
}

// create camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;
scene.add(camera);

// create light
// var ambientLight = new THREE.AmbientLight(0x0c0c0c);
// scene.add(ambientLight);

// create sphere
// var geometry = new THREE.SphereGeometry( 5, 32, 32 );
// var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// var sphere = new THREE.Mesh( geometry, material );
// sphere.position.x =
// scene.add( sphere );

camera.lookAt(cube.position);
// renderer.render(scene, camera);

var clock = new THREE.Clock();
var pos = 0;
var posX = 0;

function render() {
    renderer.render(scene, camera);
    // cube.rotation.y -= clock.getDelta();
    // cube.position.y = pos;
    // cube.position.x = posX;

    camera.position.x = posX;
    camera.position.y = pos;
    camera.lookAt(cube.position);

    // ambientLight.position.x = posX;
    // ambientLight.position.y = pos;

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
