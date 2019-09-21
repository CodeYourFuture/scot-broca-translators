import "semantic-ui-css/semantic.min.css";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import UserSignUpForm from "./components/UserSignUpForm";
import InterpreterSignUpForm from "./components/InterpreterSignUpForm";
import AddDocumentForm from "./components/AddDocumentForm";
import Dashboard from "./components/Dashboard";
import AddTranslationForm from "./components/AddTranslationForm";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { isLoggedIn } from "./components/helpers/isLoggedIn";
import { isUser } from "./components/helpers/isUser";
import ViewDocument from "./components/ViewDocument";

const logout = () => {
  sessionStorage.clear();
  window.location.href = "/";
};

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
          {isLoggedIn() ? (
            <Link className="nav-link" to="/Dashboard">
              <Menu.Item name="editorials" active={true}>
                Dashboard
              </Menu.Item>
            </Link>
          ) : null}
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

          {isLoggedIn() ? (
            <Menu.Menu position="right">
              <Link className="nav-link" to="/add-document/">
                <Menu.Item name="editorials" active={true}>
                  Add document
                </Menu.Item>
              </Link>

              <Menu.Item active={true} onClick={logout}>
                Logout
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <Menu.Menu>
              <Link className="nav-link" to="/sign-up-user">
                <Menu.Item name="editorials" active={true}>
                  User Sign Up
                </Menu.Item>
              </Link>

              <Link className="nav-link" to="/login">
                <Menu.Item name="editorials" active={true}>
                  Login
                </Menu.Item>
              </Link>

              <Link className="nav-link" to="/sign-up-interpreter">
                <Menu.Item name="editorials" active={true}>
                  Become Interpreter
                </Menu.Item>
              </Link>
            </Menu.Menu>
          )}
        </Menu>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/status/" component={Status} />
          <Route path="/sign-up-user/" component={UserSignUpForm} />
          <Route path="/login/" component={Login} />
          <Route
            path="/sign-up-interpreter/"
            component={InterpreterSignUpForm}
          />
          {isLoggedIn() ? (
            <div>
              <Route path="/add-document/" component={AddDocumentForm} />
              <Route path="/dashboard" component={Dashboard} />
              {isUser() ? null : (
                <Route
                  path="/add-document-translation/:documentId"
                  component={AddTranslationForm}
                />
              )}

              <Route path="/document/:id" component={ViewDocument} />
            </div>
          ) : null}
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
