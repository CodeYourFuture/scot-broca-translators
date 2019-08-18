import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Routes = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/status">
              Status
            </Link>
          </li>
        </ul>

        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/status/" component={Status} />
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
