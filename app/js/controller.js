import view from './view';

function keypress(e) {
    var code = (typeof e.which == 'number') ? (e.which === 0 ? e.keyCode : e.which) : e.keyCode;
    if (code == 32) {
        console.log('space clicked');
    }
}

function init() {
    // setup listeners
    document.addEventListener('keypress', keypress);
}

export default {
    init: init
};
