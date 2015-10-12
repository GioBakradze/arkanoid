import message from './message';

function Board() {

    var boardHeight = 144;
    var boardWidth = 76;
    var borderWidth = 2;

    this.board = Array.apply(null, Array(boardHeight)).map(() => Array.apply(null, Array(boardWidth)).map(() => 0));
    // create borders
    this.board = this.board.map((e, i) => e.map( (e2, i2) => ( (i2 <= -1 + borderWidth || i2 >= e.length - borderWidth) || (i <= -1 + borderWidth || i >= this.board.length - borderWidth) ? 1 : 0 )));

    this.borders = [
        {x: 0, y: boardHeight/2, width: borderWidth, height: boardHeight},
        {x: (boardWidth - 2*borderWidth)/2, y: borderWidth/2, width: boardWidth - 2*borderWidth , height: borderWidth}
        // {x: 0 + borderWidth, y: 0, width: boardWidth - 2*borderWidth , height: borderWidth}
    ];
}

var gameBoard = new Board();
export default gameBoard;
