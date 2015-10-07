function Board() {
    this.board = Array.apply(null, Array(114)).map(() => Array.apply(null, Array(76)).map(() => 0));
    // create borders
    this.board = this.board.map((e, i) => e.map( (e2, i2) => ( (i2 <= 1 || i2 >= e.length - 2) || (i <= 1 || i >= this.board.length - 2) ? 1 : 0 )));
}

var gameBoard = new Board();
export default gameBoard;
