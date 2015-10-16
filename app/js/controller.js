import view from './view';
import board from './board';

var gameStarted = false;

function keypress(e) {
    var code = (typeof e.which == 'number') ? (e.which === 0 ? e.keyCode : e.which) : e.keyCode;

    // space
    if (code == 32 && !gameStarted) {
        gameStarted = true;

        // console.log(Math.floor(Math.random() * 10));
        view.updateBall(board.getNextMove());

        setInterval(function () {
            view.updateBall(board.getNextMove());
        }, 1000);
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
