import message from './message';

function Board() {

    var boardHeight = 100;
    var boardWidth = 74; // 76
    var borderWidth = 2;
    var blocksRow = 5;
    var blocksCol = 10;

    // this.board = Array.apply(null, Array(boardHeight)).map(() => Array.apply(null, Array(boardWidth)).map(() => 0));
    // create borders
    // this.board = this.board.map((e, i) => e.map( (e2, i2) => ( (i2 <= -1 + borderWidth || i2 >= e.length - borderWidth) || (i <= -1 + borderWidth || i >= this.board.length - borderWidth) ? 1 : 0 )));

    // the block size is 5x2 space between
    // blocks is 2 units, keep that in mind, also border is 2 units
    // when trying to understand logic behind those cycles
    this.blocks = [];
    for (let i=0; i < blocksRow; i++) {
        let startX, startY;
        let x, y;
        // startY = boardHeight/2 + blocksRow * 4;
        startY = boardHeight/2 - blocksRow * 4;
        startX = -1 * boardWidth / 2 + 5.5;

        y = startY + 4*i;
        for (var j=0; j < blocksCol; j++) {
            x = startX + 7*j;
            this.blocks.push({
                x: x,
                y: y,
                width: 5,
                height: 2
            });
        }
    }

    this.borders = [
        {x: -1* (boardWidth/2), y: 0, width: borderWidth, height: boardHeight},
        {x: 0, y: -1*(boardHeight/2), width: boardWidth, height: borderWidth},
        {x: 0, y: boardHeight/2, width: boardWidth, height: borderWidth},
        {x: boardWidth/2, y: 0, width: borderWidth, height: boardHeight},
        // {x: 0, y: 0, width: borderWidth, height: boardHeight},
        // {x: 0, y: 0, width: boardWidth, height: borderWidth},
        // {x: 0, y: boardHeight/2, width: boardWidth, height: borderWidth},
        // {x: boardWidth/2, y: 0, width: borderWidth, height: boardHeight},
    ];

    this.user = [
        {x: 0, y: -1*(boardHeight/2) + 3, width: 10, height: 2}
    ];

    this.ball = [
        {x: 0, y: -1*(boardHeight/2) + 3 + 1.5 + 1, width: 3, height: 3}
    ];
}

var gameBoard = new Board();
export default gameBoard;
