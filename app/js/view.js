import THREE from 'three';
import board from './board';
import TWEEN from 'tween.js';
import _ from 'underscore';

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
    this.light.position.set( 350, 350, 250 );
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
    this.camera.position.z = 0;
    this.scene.add(this.camera);

    this.dropBlocks(b.borders, 0x00afff);
    this.blocks = this.dropBlocks(b.blocks, 0xf0676f);
    this.userPad = (this.dropBlocks(b.user, 0x1ec876))[0];
    this.ball = (this.dropBlocks(b.ball, 0xEFD76F))[0];

    // ########################################
    // some random events
    this.camera.lookAt(this.center);
    var clock = new THREE.Clock();
    var pos = 0;
    var posX = 0;

    function render() {
        this.renderer.render(this.scene, this.camera);

        TWEEN.update();
        window.requestAnimationFrame(render.bind(this));
    }
    var that = this;
    new TWEEN.Tween({z: 0}).to({z: 200}, 2000).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function () {
        that.camera.position.z = this.z;
        that.camera.lookAt(that.center);
    }).onComplete(function (argument) {
        // run light tween here
        new TWEEN.Tween({x: 350, y: 350, z: 250}).to({x: 50, y: 50, z: 250}, 1000).onUpdate(function () {
            that.light.position.set( this.x, this.y, this.z);
        }).start();
    }).start();

    render.bind(this)();
    this.prevClientX = undefined;
}

View.prototype.rotateBoard = function(clientX) {
    // if (!_.isUndefined(this.prevClientX)) {
    //     if (clientX - this.prevClientX > 0 && this.camera.rotation.y <= 0.5) {
    //         this.camera.rotation.y += 0.005;
    //     } else {
    //         if (this.camera.rotation.y >= -0.5) {
    //             this.camera.rotation.y -= 0.005;
    //         }
    //     }
    // }
    // this.prevClientX = clientX;
};

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

View.prototype.updateBall = function (moveTo, updated) {
    var target = { x : moveTo.x, y: moveTo.y };
    var start = {
        x: this.ball.position.x,
        y: this.ball.position.y
    };
    var that = this;
    this.tween = new TWEEN.Tween(start).to(target, 1000);

    this.tween.onUpdate(function () {
        if (!_.isUndefined(this.x) && !_.isUndefined(this.y)) {
            that.ball.position.x = this.x;
            that.ball.position.y = this.y;
            board.ball[0].x = this.x;
            board.ball[0].y = this.y;
        }
        updated(this.x, this.y);
    });

    this.tween.start();
};

View.prototype.cancelTween = function () {
    this.tween.stop();
};

View.prototype.removeBlock = function (index) {
    _.each(this.blocks, (e, i) => {
        if (index == i) {
            this.scene.remove(e);
        }
    });
};

var view = new View(board);

export default view;
