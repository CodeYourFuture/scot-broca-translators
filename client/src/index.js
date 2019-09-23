import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
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
import { Menu, Image, Container } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { isLoggedIn } from "./components/helpers/isLoggedIn";
import { isUser } from "./components/helpers/isUser";
import ViewDocument from "./components/ViewDocument";
import { Footer } from "./Footer";

class Routes extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Router>
        <div className="site">
          <Menu borderless inverted>
            <Container>
              <Menu.Item
                as={Link}
                to="/"
                header
                name="broca translation"
                active={activeItem === "broca translation"}
                onClick={this.handleItemClick}
              >
                <Image
                  src="https://image.flaticon.com/icons/svg/2014/2014350.svg"
                  style={{ marginRight: "1.5em" }}
                  size="mini"
                />
                Broca Translation
              </Menu.Item>
              <Menu.Item
                name="home"
                as={Link}
                to="/"
                header
                active={activeItem === "home"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="about"
                as={Link}
                to="/about"
                header
                active={activeItem === "about"}
                onClick={this.handleItemClick}
              />
              {isLoggedIn() ? (
                <Menu.Menu position="left">
                  <Menu.Item
                    name="dashboard"
                    as={Link}
                    to="/Dashboard"
                    header
                    active={activeItem === "dashboard"}
                    onClick={this.handleItemClick}
                  />
                  {isUser() ? (
                    <Menu.Item
                      name="add document"
                      as={Link}
                      to="/add-document"
                      header
                      active={activeItem === "add document"}
                      onClick={this.handleItemClick}
                    />
                  ) : null}
                  <Menu.Item
                    onClick={this.logout}
                    as={Link}
                    header
                    name="logout"
                  />
                </Menu.Menu>
              ) : (
                <Menu.Menu position="left">
                  <Menu.Item
                    name="login"
                    as={Link}
                    to="/login"
                    header
                    active={activeItem === "login"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="user registration"
                    as={Link}
                    to="/sign-up-user"
                    header
                    active={activeItem === "user registration"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="interpreter registration"
                    as={Link}
                    to="/sign-up-interpreter"
                    header
                    active={activeItem === "interpreter registration"}
                    onClick={this.handleItemClick}
                  />
                </Menu.Menu>
              )}
            </Container>
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
        <Footer />
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById("root"));
