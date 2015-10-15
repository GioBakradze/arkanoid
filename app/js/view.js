import THREE from 'three';
import board from './board';

function View(b) {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    document.body.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.center = new THREE.Vector3( 0, 0, 0 );

    // ########################################
    // create point light like a light bulb
    this.light = new THREE.PointLight(0xffffff);
    this.light.position.set( 50, 50, 250 );
    this.scene.add(this.light);

    // ########################################
    // create moving ball
    // this.cubeGeometry = new THREE.CubeGeometry(5, 5, 2);
    // this.cubeMaterial = new THREE.MeshPhongMaterial({
    //     color: 0x1ec876
    // });
    // this.cube = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial);
    // this.scene.add(this.cube);

    // ########################################
    // create camera
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 150;
    this.scene.add(this.camera);

    this.dropBlocks(b.borders, 0x00afff);
    this.dropBlocks(b.blocks, 0xf0676f);
    this.userPad = (this.dropBlocks(b.user, 0x1ec876))[0];
    this.dropBlocks(b.ball, 0xEFD76F);

    // ########################################
    // some random events
    this.camera.lookAt(this.center);
    var clock = new THREE.Clock();
    var pos = 0;
    var posX = 0;

    function render() {
        this.renderer.render(this.scene, this.camera);
        this.camera.position.x = posX;
        this.camera.position.y = pos;
        this.camera.lookAt(this.center);
        window.requestAnimationFrame(render.bind(this));
    }

    var next = null;
    document.addEventListener('mousemove', function(e) {
        if (!!next) {
            pos = e.clientX - next > 0 ? pos + 1 : pos - 1;
            posX = e.clientX - next > 0 ? pos + 1 : pos - 1;
        }
        next = e.clientX;
    }, false);

    render.bind(this)();
}

View.prototype.dropBlocks = function(array, color) {
    var res = [];
    for (let i in array) {
        var b = array[i];
        var geometry = new THREE.BoxGeometry(b.width, b.height, 1);
        var material = new THREE.MeshPhongMaterial({
            color: color
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.x = b.x;
        cube.position.y = b.y;
        cube.position.z = 0;
        this.scene.add(cube);
        res.push(cube);
    }
    return res;
};

View.prototype.updateUserPad = function () {
    this.userPad.position.x = board.user[0].x;
};

var view = new View(board);

export default view;
