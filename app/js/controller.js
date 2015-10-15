import view from './view';
import board from './board';

function keypress(e) {
    var code = (typeof e.which == 'number') ? (e.which === 0 ? e.keyCode : e.which) : e.keyCode;

    // space
    if (code == 32) {
        console.log('space clicked');
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
