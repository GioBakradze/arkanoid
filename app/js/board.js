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
            x: this.rightSide - this.halfBall,
            y: this.bottomSide + this.halfBall
        }, {
            x: this.rightSide - this.halfBall,
            y: this.topSide - this.halfBall
        }],
        [{
            x: this.leftSide + this.halfBall,
            y: this.bottomSide + this.halfBall
        }, {
            x: this.leftSide + this.halfBall,
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

    _.each(this.blocks, (e,i) => {
        this.ballCollisionSegments.push([{
            x: e.x - 2.5 - this.halfBall,
            y: e.y - 1,
            blockIndex: i
        }, {
            x: e.x + 2.5 + this.halfBall,
            y: e.y - 1,
            blockIndex: i
        }]);

        this.ballCollisionSegments.push([{
            x: e.x - 2.5 - this.halfBall,
            y: e.y + 1,
            blockIndex: i
        }, {
            x: e.x - 2.5 - this.halfBall,
            y: e.y - 1,
            blockIndex: i
        }]);

        this.ballCollisionSegments.push([{
            x: e.x + 2.5 + this.halfBall,
            y: e.y + 1,
            blockIndex: i
        }, {
            x: e.x + 2.5 + this.halfBall,
            y: e.y - 1,
            blockIndex: i
        }]);
    });

    // game flow variables
    this.angle = SimpleMath.getRandomBetween(30, 35);
    this.moveCount = 1;
    this.directionUp = true;
}

Board.prototype.restartCycle = function(argument) {
    this.angle = SimpleMath.getRandomBetween(30, 35);
    this.moveCount = 1;
    this.directionUp = true;
};

Board.prototype.movePadLeft = function() {
    var curX = this.user[0].x;
    this.user[0].x = curX - 5 >= this.leftSide + 5 + 1 ? curX - 5 : curX;
};

Board.prototype.movePadRight = function() {
    var curX = this.user[0].x;
    this.user[0].x = curX + 5 <= this.rightSide - 5 - 1 ? curX + 5 : curX;
};

Board.prototype.checkUserCollision = function(x, y) {

    var padXLeft = this.user[0].x - 5 - 1 - this.halfBall;
    var padXRight = this.user[0].x + 5 + 1 + this.halfBall;
    var padYTop = this.user[0].y + 1 + 1;
    var padYBottom = this.user[0].y - 1 - 1;

    if (x >= padXLeft && x <= padXRight && y >= padYBottom && y <= padYTop) {
        return true;
    }
    return false;
};

Board.prototype.checkLooseCondition = function(x, y) {
    if (y === (this.bottomSide + this.halfBall)) return true;
    return false;
};

Board.prototype.getNextMove = function() {

    var currentX = this.ball[0].x;
    var currentY = this.ball[0].y;

    // new coordinates
    var destX, destY;

    // generate some large segment
    var currentAngle = !(this.moveCount & 1) ? 180 - this.angle : this.angle;
    // console.log('angle', currentAngle);
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

    // check for collisions
    var yCollision = false;
    var minDistance = 9999999;
    _.each(this.ballCollisionSegments, e => {
        var intersection = SimpleMath.getIntersection(segment.a, segment.b, e[0], e[1]);


        if (intersection !== false && intersection.x != currentX && intersection.y != currentY) {
            if (this.directionUp && intersection.y >= currentY || !this.directionUp && intersection.y <= currentY) {

                var dist = SimpleMath.distance({
                    x: currentX,
                    y: currentY
                }, intersection);

                if (dist < minDistance) {
                    minDistance = dist;
                    destX = intersection.x;
                    destY = intersection.y;


                    if (e[0].hasOwnProperty('blockIndex')) {
                        // console.log(e[0].blockIndex);

                        this.ballCollisionSegments = _.filter(this.ballCollisionSegments, e2 => {
                            if (e2[0].hasOwnProperty('blockIndex') && e2[0].blockIndex == e[0].blockIndex) return false;
                            return true;
                        });

                        if (this.hasOwnProperty('blockKilled')) {
                            this.blockKilled(e[0].blockIndex);
                        }
                    }

                    // console.log(e[1].y, destY);

                    if (e[0].y === e[1].y && ( destY <= e[1].y+1 && destY >= e[1].y-1 )) {
                        yCollision = true;
                    } else {
                        yCollision = false;
                    }
                }

            }
        }

    });

    if (yCollision) {
        this.directionUp = !this.directionUp;
    }

    this.moveCount++;
    // this.ball[0].x = destX;
    // this.ball[0].y = destY;

    // console.log(destX, destY);
    return {
        x: destX,
        y: destY
    };
};

var gameBoard = new Board();
export default gameBoard;
