import view from './view';
import board from './board';

var gameStarted = false;
var gameInterval;
var userScore = 0;

board.blockKilled = function(i) {
    window.setTimeout(function () {
        view.removeBlock(i);
        userScore++;
        if (userScore == 50) {
            alert('You score: ' + userScore);
            window.location.reload();
        }
    }, 1000);
};

function mousemove(e) {
    view.rotateBoard(e.clientX);
}

function updated(x, y) {
    // check for pad collision
    if (board.checkUserCollision(x, y)) {
        // console.log('hit', board.checkUserCollision(x, y));
        clearInterval(gameInterval);
        view.cancelTween();
        initGame();
    }

    // check for loose condition
    if (board.checkLooseCondition(x, y)) {
        clearInterval(gameInterval);
        view.cancelTween();
        alert('You score: ' + userScore);

        // easy way to restart game
        window.location.reload();
    }
}

function initGame() {
    board.restartCycle();
    view.updateBall(board.getNextMove(), updated);
    gameInterval = setInterval(function() {
        view.updateBall(board.getNextMove(), updated);
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
    document.addEventListener('mousemove', mousemove);
}

export default {
    init: init
};
