//import React from "react";
import React, { Component } from "react";

class Logout extends Component {
  logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <button onClick={this.logout()}>LOGOUT</button>
      </div>
    );
  }
}

export default Logout;
