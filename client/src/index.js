import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import { Menu } from "semantic-ui-react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
              About About
            </Menu.Item>
          </Link>
          <Link className="nav-link" to="/status">
            <Menu.Item name="editorials" active={true}>
              Status
            </Menu.Item>
          </Link>
        </Menu>

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
