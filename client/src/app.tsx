import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Demos from "./demos";

const App = () => {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/demos/">Demos</Link>
        </li>
        <li>
          <Link to="/libs/">Libs</Link>
        </li>
        <li>
          <Link to="/articles/">Articles</Link>
        </li>
      </ul>
      <hr />
      <Route exact path="/" component={() => <div>Home</div>} />
      <Route path="/demos" component={Demos} />
      <Route path="/libs" component={() => <div>coming soon</div>} />
      <Route path="/articles" component={() => <div>coming soon</div>} />
    </Router>
  );
};

export default App;
