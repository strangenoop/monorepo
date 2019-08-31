import React, { useState, useEffect } from "react";
import Game from "./classes/game";
import "./TicTacToe.css";

const game = new Game();

const TicTacToe = () => {
  const [board, setBoard] = useState([[], [], []]);
  useEffect(() => {
    const updateBoard = (row, column, squareState) => {
      if (board[row][column] === squareState) {
        return;
      }
      const newBoard = board.slice(0);
      newBoard[row][column] = squareState;
      setBoard(newBoard);
    };
    return game.watch(updateBoard);
  });
  return (
    <div>
      <h3>Tic Tac Toe</h3>
      <div className="container" id="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((square, j) => (
              <div
                key={j}
                className="square"
                id={`square_${i}_${j}`}
                onClick={() => {
                  game.makeMove(i, j);
                }}
              >
                {square}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button id="new-game" type="button" className="btn btn-default btn-lg">
        New Game
      </button>
      <p id="message" />
    </div>
  );
};

export default TicTacToe;
