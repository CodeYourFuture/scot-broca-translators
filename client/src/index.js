import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import { Menu } from "semantic-ui-react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";

const Routes = () => {
  return (
    <Router>
      <div>
        <Menu>
          <Link className="nav-link" to="/">
            <Menu.Item name="editorials" active={true}>
              Home
            </Menu.Item>
          </Link>
          <Link className="nav-link" to="/about">
            <Menu.Item name="editorials" active={true}>
              About
            </Menu.Item>
          </Link>
          <Link className="nav-link" to="/status">
            <Menu.Item name="editorials" active={true}>
              Status
            </Menu.Item>
          </Link>
          <Link className="nav-link" to="/login">
            <Menu.Item name="editorials" active={true}>
              Login
            </Menu.Item>
          </Link>
        </Menu>

        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/status/" component={Status} />
          <Route path="/login/" component={Login} />
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
