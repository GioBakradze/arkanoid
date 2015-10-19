import SimpleMath from './simpleMath';
import _ from 'underscore';

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
    for (let i = 0; i < blocksRow; i++) {
        let startX, startY;
        let x, y;
        startY = boardHeight / 2 - blocksRow * 4;
        startX = -1 * boardWidth / 2 + 5.5;

        y = startY + 4 * i;
        for (var j = 0; j < blocksCol; j++) {
            x = startX + 7 * j;
            this.blocks.push({
                x: x,
                y: y,
                width: 5,
                height: 2
            });
        }
    }

    this.borders = [{
        x: -1 * (boardWidth / 2),
        y: 0,
        width: borderWidth,
        height: boardHeight
    }, {
        x: 0,
        y: -1 * (boardHeight / 2),
        width: boardWidth,
        height: borderWidth
    }, {
        x: 0,
        y: boardHeight / 2,
        width: boardWidth,
        height: borderWidth
    }, {
        x: boardWidth / 2,
        y: 0,
        width: borderWidth,
        height: boardHeight
    }, ];

    this.user = [{
        x: 0,
        y: -1 * (boardHeight / 2) + 3,
        width: 10,
        height: 2
    }];

    this.ball = [{
        x: 0,
        y: -1 * (boardHeight / 2) + 3 + 1.5 + 1,
        width: 3,
        height: 3
    }];

    this.leftSide = -1 * (boardWidth / 2);
    this.rightSide = boardWidth / 2;
    this.topSide = boardHeight / 2;
    this.bottomSide = -1 * (boardHeight / 2);

    this.ballRightSide = this.rightSide - 2.5;
    this.ballLeftSide = this.leftSide + 2.5;

    this.halfBall = 2.5;

    this.ballCollisionSegments = [
        // vertical line segments
        [{
            x: this.leftSide + this.halfBall,
            y: this.bottomSide + this.halfBall
        }, {
            x: this.leftSide + this.halfBall,
            y: this.topSide - this.halfBall
        }],
        [{
            x: this.rightSide - this.halfBall,
            y: this.bottomSide + this.halfBall
        }, {
            x: this.rightSide - this.halfBall,
            y: this.topSide - this.halfBall
        }],

        // horizontal line segments
        [{
            x: this.leftSide + this.halfBall,
            y: this.topSide - this.halfBall
        }, {
            x: this.rightSide - this.halfBall,
            y: this.topSide - this.halfBall
        }],
        [{
            x: this.leftSide + this.halfBall,
            y: this.bottomSide + this.halfBall
        }, {
            x: this.rightSide - this.halfBall,
            y: this.bottomSide + this.halfBall
        }]
    ];

    // game flow variables
    this.angle = Math.floor(Math.random() * 45) + 30; // get starting angle randomly between 30 and 45 degrees
    this.moveCount = 1;
}

Board.prototype.movePadLeft = function() {
    var curX = this.user[0].x;
    this.user[0].x = curX - 2 >= this.leftSide + 5 + 1 ? curX - 2 : curX;
};

Board.prototype.movePadRight = function() {
    var curX = this.user[0].x;
    this.user[0].x = curX + 2 <= this.rightSide - 5 - 1 ? curX + 2 : curX;
};

Board.prototype.getNextMove = function() {

    var currentX = this.ball[0].x;
    var currentY = this.ball[0].y;

    // new coordinates
    var destX, destY;

    // generate some large segment
    var currentAngle = !(this.moveCount & 1) ? 180 - this.angle : this.angle;
    currentAngle = Math.tan(SimpleMath.toRadians(currentAngle));

    var f = SimpleMath.getF(currentAngle, currentY);
    var segment = {
        a: {
            x: this.ballRightSide,
            y: f(this.ballRightSide)
        },
        b: {
            x: this.ballLeftSide,
            y: f(this.ballLeftSide)
        }
    };

    var x = (currentX === this.ballRightSide) ? this.ballLeftSide : this.ballRightSide;
    var y = f(x);

    // check for collisions
    var minDistance = 9999999;
    _.each(this.ballCollisionSegments, function(e) {
        var intersection = SimpleMath.getIntersection(segment.a, segment.b, e[0], e[1]);

        console.log('i e', intersection, e);

        if ( !!intersection && intersection[0] != currentX && intersection[1] != currentY) {
            var dist = SimpleMath.distance({x: currentX, y: currentY}, {x: intersection[0], y: intersection[1] });
            // console.log('d', dist);
            if (dist < minDistance) {
                minDistance = dist;
                destX = intersection[0];
                destY = intersection[1];
            }
        }
    });

    console.log('s', segment);
    console.log('x', x, destX);
    console.log('y', y, destY);

    this.moveCount++;
    this.ball[0].x = destX;
    this.ball[0].y = destY;
    return {
        x: destX,
        y: destY
    };
};

var gameBoard = new Board();
export default gameBoard;
