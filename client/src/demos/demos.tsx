import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HelloApi from "./hello-api";
import TicTacToe from "./tic-tac-toe";

const Demos = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/demos/hello-api/">Hello API</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/">Tic Tac Toe</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={() => <div>Demos</div>} />
      <Route path="/demos/hello-api" component={HelloApi} />
      <Route path="/demos/tic-tac-toe" component={TicTacToe} />
    </Router>
  );
};

export default Demos;
