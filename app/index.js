import THREE from 'three';

var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

// create cue
var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x1ec876
});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.rotation.y = Math.PI * 45 / 180;
scene.add(cube);

// create camera
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 200;
scene.add(camera);

// create skybox
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.BackSide
});
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
scene.add(skybox);

// create light
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 200);
scene.add(pointLight);

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

    pointLight.position.x = posX;
    pointLight.position.y = pos;
    camera.lookAt(cube.position);

    window.requestAnimationFrame(render);
}

var next = null;
document.addEventListener('mousemove', function(e) {
    if (!!next) {
        pos = e.clientX - next > 0 ? pos + 1 : pos - 1;
        posX = e.clientX - next > 0 ? pos + 1 : pos - 1;
        console.log(pos);
    }
    next = e.clientX;
}, false);

render();
