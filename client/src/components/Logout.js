//import React from "react";
import React, { Component } from "react";
//import { Nav, Navbar, NavItem } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Logout extends Component {
  logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  componentDidMount() {
    sessionStorage.clear();
  }

  render() {
    return <div>Now loggedOut;</div>;
  }
}
export default Logout;
