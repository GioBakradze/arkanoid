import view from './view';
import board from './board';

var gameStarted = false;
var gameInterval;

function collisionCheck(x, y) {
    if (board.checkUserCollision(x, y)) {
        // console.log('hit', board.checkUserCollision(x, y));
        clearInterval(gameInterval);
        view.cancelTween();
        initGame();
    }
}

function initGame() {
    board.restartCycle();
    view.updateBall(board.getNextMove(), collisionCheck);
    gameInterval = setInterval(function() {
        view.updateBall(board.getNextMove(), collisionCheck);
    }, 1000);
}

function keypress(e) {
    var code = (typeof e.which == 'number') ? (e.which === 0 ? e.keyCode : e.which) : e.keyCode;

    // space
    if (code == 32 && !gameStarted) {
        gameStarted = true;
        initGame();
    }
}

function keydown(e) {
    var code = (typeof e.which == 'number') ? (e.which === 0 ? e.keyCode : e.which) : e.keyCode;

    // arrow left
    if (code == 37) {
        board.movePadLeft();
        view.updateUserPad();
    }

    // arrow right
    if (code == 39) {
        board.movePadRight();
        view.updateUserPad();
    }
}

function init() {
    // setup listeners
    document.addEventListener('keypress', keypress);
    document.addEventListener('keydown', keydown);
}

export default {
    init: init
};
