import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Demos from "./demos";

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
      </ul>
      <hr />
      <ul>
        <li>
          <Link to="/demos/">demos</Link>
        </li>
        <li>
          <Link to="/libs/">libs</Link>
        </li>
        <li>
          <Link to="/articles/">articles</Link>
        </li>
        <li>
          <Link to="/cv/">cv</Link>
        </li>
      </ul>
      <hr />
      <Route
        exact
        path="/"
        component={() => (
          <p>
            The name "strangenoop" is a nod Douglas Hofstadter's concept of a
            "strange loop". It's that combined with "noop", which is a lodash
            function that doesn't do anything. While the lodash function is
            pronounced "no-op", strangenoop is pronounced the way it's spelled.
          </p>
        )}
      />
      <Route path="/demos" component={Demos} />
      <Route path="/libs" component={() => <div>coming soon</div>} />
      <Route path="/articles" component={() => <div>coming soon</div>} />
      <Route path="/cv" component={() => <div>coming soon</div>} />
    </Router>
  );
};

export default App;
