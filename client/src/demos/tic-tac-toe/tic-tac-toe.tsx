import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ObjectOriented from "./object-oriented";
import "./tic-tac-toe.css";

const TicTacToe = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/demos/tic-tac-toe/object-oriented">Object Oriented</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/data-driven">Data Driven</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/behavioral">Behavioral</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={() => <div>Tic Tac Toe</div>} />
      <Route
        path="/demos/tic-tac-toe/object-oriented"
        component={ObjectOriented}
      />
      <Route
        path="/demos/tic-tac-toe/data-driven"
        component={() => <div>coming soon</div>}
      />
      <Route
        path="/demos/tic-tac-toe/behavioral"
        component={() => <div>coming soon</div>}
      />
    </Router>
  );
};

export default TicTacToe;
