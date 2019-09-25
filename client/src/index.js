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
import {
  Menu,
  Image,
  Container,
  Responsive,
  Sidebar,
  Icon
} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { isLoggedIn } from "./components/helpers/isLoggedIn";
import { isUser } from "./components/helpers/isUser";
import ViewDocument from "./components/ViewDocument";

class NavBarMenuItems extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const activeItem = this.props.activeItem;

    return (
      <React.Fragment>
        <Menu.Item
          as={Link}
          to="/"
          header
          name="broca translation"
          active={activeItem === "broca translation"}
          onClick={this.handleItemClick}
        >
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
          <React.Fragment>
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
            <Menu.Item onClick={this.logout} as={Link} header name="logout" />
          </React.Fragment>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const NavBarMobile = ({ children, onPusherClick, onToggle, visible }) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
    >
      <NavBarMenuItems />
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: "100vh" }}
    >
      <Menu inverted>
        <Menu.Item>
          <Image
            size="mini"
            src="https://image.flaticon.com/icons/svg/2014/2014350.svg"
          />
        </Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = () => (
  <Menu inverted>
    <Menu.Item>
      <Image
        size="mini"
        src="https://image.flaticon.com/icons/svg/2014/2014350.svg"
      />
    </Menu.Item>
    <NavBarMenuItems />
  </Menu>
);
class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  render() {
    const { children } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            visible={visible}
          >
            <Container>{children}</Container>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop />
          <Container>{children}</Container>
        </Responsive>
      </div>
    );
  }
}

class Routes extends Component {
  logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <Router>
        <NavBar>
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
        </NavBar>
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById("root"));
