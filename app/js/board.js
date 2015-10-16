import SimpleMath from './simpleMath';

function Board() {

    var boardHeight = 100;
    var boardWidth = 74; // 76
    var borderWidth = 2;
    var blocksRow = 5;
    var blocksCol = 10;

    this.boardHeight = boardHeight;

    // the block size is 5x2 space between
    // blocks is 2 units, keep that in mind, also border is 2 units
    // when trying to understand logic behind those cycles
    this.blocks = [];
    for (let i=0; i < blocksRow; i++) {
        let startX, startY;
        let x, y;
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
    ];

    this.user = [
        {x: 0, y: -1*(boardHeight/2) + 3, width: 10, height: 2}
    ];

    this.ball = [
        {x: 0, y: -1*(boardHeight/2) + 3 + 1.5 + 1, width: 3, height: 3}
    ];

    this.leftSide = -1* (boardWidth/2);
    this.rightSide = boardWidth/2;

    this.ballRightSide = this.rightSide - 2.5;
    this.ballLeftSide = this.leftSide + 2.5;

    // game flow variables
    this.angle = Math.floor(Math.random() * 45) + 30; // get starting angle randomly between 30 and 45 degrees
}

Board.prototype.movePadLeft = function () {
    var curX = this.user[0].x;
    this.user[0].x = curX - 2 >= this.leftSide + 5 + 1 ? curX - 2 : curX;
};

Board.prototype.movePadRight = function () {
    var curX = this.user[0].x;
    this.user[0].x = curX + 2 <= this.rightSide - 5 - 1 ? curX + 2 : curX;
};

Board.prototype.getNextMove = function () {

    var x = (this.ball[0].x === this.ballLeftSide) ? this.ballRightSide : this.ballLeftSide;

    var currentAngle = 90 - this.angle;
    // currentAngle = x < this.ball[0].x ? 180 - currentAngle : currentAngle;
    this.angle = currentAngle;
    currentAngle = x < this.ball[0].x ? 90 +  currentAngle : currentAngle;

    currentAngle = Math.tan(SimpleMath.toRadians(currentAngle));

    // remember y = kx + b from 6th grade?
    var y = x * currentAngle + (-1*(this.boardHeight/2) + 5.5);

    console.log(this.ball[0].x, this.ballLeftSide, y);

    this.ball[0].x = x;
    this.ball[0].y = y;
    return {x: x, y: y};
};

var gameBoard = new Board();
export default gameBoard;
