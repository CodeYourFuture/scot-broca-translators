import React from "react";
import { getStatus, getUsers } from "../api/status";

class Status extends React.Component {
  state = {
    status: null,
    users: []
  };

  componentDidMount() {
    getStatus().then(response => {
      this.setState({ status: response });
    });
    getUsers().then(response => {
      this.setState({ users: response });
    });
  }

  render() {
    return (
      <div>
        <header className="app-header">
          <label>Database health check (querying users in DB):</label>
          {!this.state.users.length ? (
            <p>No users</p>
          ) : (
            <ul>
              {this.state.users.map(user => (
                <li key={user.id}>user: {user.email}</li>
              ))}
            </ul>
          )}
          <h6>
            API health check:{" "}
            {!this.state.status
              ? "No Status received from server"
              : this.state.status}
          </h6>
        </header>
      </div>
    );
  }
}

export default Status;
