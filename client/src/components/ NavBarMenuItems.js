import React from "react";
import {
  Menu,
  Image,
  Container,
  Responsive,
  Sidebar,
  Icon
} from "semantic-ui-react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { isLoggedIn } from "./helpers/isLoggedIn";
import { isUser } from "./helpers/isUser";
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

export default NavBarMenuItems;
