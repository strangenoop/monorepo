import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ObjectOriented from "./object-oriented";
import "./tic-tac-toe.css";

const TicTacToe = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/demos/tic-tac-toe/object-oriented">object-oriented</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/data-driven">data-driven</Link>
        </li>
        <li>
          <Link to="/demos/tic-tac-toe/behavioral">behavioral</Link>
        </li>
      </ul>
      <hr />
      <div className="ttt">
        <Route
          exact
          path="/demos/tic-tac-toe"
          component={() => <div>Tic Tac Toe</div>}
        />
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
      </div>
    </Router>
  );
};

export default TicTacToe;
