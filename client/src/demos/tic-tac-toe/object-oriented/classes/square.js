export default class Square {
  static EMPTY_STATE = 0;
  static X_STATE = 1;
  static O_STATE = 2;

  static unpack(state) {
    if (state === Square.X_STATE) {
      return "X";
    } else if (state === Square.O_STATE) {
      return "O";
    } else {
      return "_";
    }
  }

  constructor() {
    this.state = Square.EMPTY_STATE;
  }

  isX() {
    return this.state === Square.X_STATE;
  }
  isO() {
    return this.state === Square.O_STATE;
  }
  isEmpty() {
    return this.state === Square.EMPTY_STATE;
  }
  unpack() {
    return Square.unpack(this.state);
  }
}
