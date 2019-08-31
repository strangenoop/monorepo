import Square from "./square";

export default class Board {
  static playing = 0;
  static xWins = 1;
  static oWins = 2;
  static tie = 3;

  static stateWins(board, state) {
    for (let i = 0; i < 3; i++) {
      // Horizontal rows
      if (
        board[i][0].state === state &&
        board[i][1].state === state &&
        board[i][2].state === state
      ) {
        return true;
      }
      // Vertical rows
      if (
        board[0][i].state === state &&
        board[1][i].state === state &&
        board[2][i].state === state
      ) {
        return true;
      }
    }
    // Diagonal top-left to bottom-right
    if (
      board[0][0].state === state &&
      board[1][1].state === state &&
      board[2][2].state === state
    ) {
      return true;
    }
    // Diagonal top-right to bottom-left
    if (
      board[0][2].state === state &&
      board[1][1].state === state &&
      board[2][0].state === state
    ) {
      return true;
    }
    return false;
  }

  static hasOpenSquare(board) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].isEmpty()) {
          return true;
        }
      }
    }
  }

  constructor() {
    this.board = [];
    this.reset();
  }

  reset() {
    // prettier-ignore
    this.board = [
      [new Square(), new Square(), new Square()],
      [new Square(), new Square(), new Square()],
      [new Square(), new Square(), new Square()],
    ];
  }
  setSquare(row, column, squareState) {
    this.board[row][column].state = squareState;
  }
  getSquareState(row, column) {
    return this.board[row][column].state;
  }
  getSquareIsEmpty(row, column) {
    return this.board[row][column].isEmpty();
  }
  getBoardState() {
    if (Board.stateWins(this.board, Square.X_STATE)) {
      return Board.xWins;
    }
    if (Board.stateWins(this.board, Square.O_STATE)) {
      return Board.oWins;
    }
    if (Board.hasOpenSquare(this.board)) {
      return Board.playing;
    }
    return Board.tie;
  }
  walk(report) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        report(i, j, this.board[i][j].unpack());
      }
    }
  }
}
