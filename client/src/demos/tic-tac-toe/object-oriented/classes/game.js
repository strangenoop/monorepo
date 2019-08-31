import Board from "./board";
import Player from "./player";
import Square from "./square";

export default class Game {
  spectators = [];

  constructor() {
    this.board = new Board();
    this.playerX = new Player(Square.X_STATE, "playerX");
    this.playerO = new Player(Square.O_STATE, "playerO");
    this.currentMove = this.playerX;
  }

  makeMove(row, column) {
    if (this.board.getSquareIsEmpty(row, column)) {
      this.board.setSquare(row, column, this.currentMove.squareState);
      this.spectators.forEach(notify => {
        console.log(this.currentMove.squareState);
        notify(row, column, Square.unpack(this.currentMove.squareState));
      });
      this._changeTurn();
      return true;
    }
    return false;
  }
  winner() {
    return this.board.getBoardState();
  }
  reset() {
    this.currentMove = this.playerX;
    this.board.reset();
  }
  watch(notify) {
    this.board.walk(notify);
    this.spectators.push(notify);
    return () => {
      this.unWatch();
    };
  }
  unWatch() {
    // TODO
    this.spectators = [];
  }

  _changeTurn() {
    if (this.currentMove === this.playerX) {
      this.currentMove = this.playerO;
    } else {
      this.currentMove = this.playerX;
    }
  }
}
