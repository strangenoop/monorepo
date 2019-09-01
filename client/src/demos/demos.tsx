import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HelloApi from "./hello-api";
import TicTacToe from "./tic-tac-toe";
import KeyboardMusic from "./keyboard-music";

const Demos = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/demos/hello-api/">hello-api</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/">tic-tac-toe</Link>
        </li>
        <li>
          <Link to="/demos/keyboard-music/">keyboard-music</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/demos" component={() => <div>Demos</div>} />
      <Route path="/demos/hello-api" component={HelloApi} />
      <Route path="/demos/tic-tac-toe" component={TicTacToe} />
      <Route path="/demos/keyboard-music" component={KeyboardMusic} />
    </Router>
  );
};

export default Demos;
