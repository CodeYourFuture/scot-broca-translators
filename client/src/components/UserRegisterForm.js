import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid } from "semantic-ui-react";

export class UserRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmationpassword: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    const UserRequest = {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        confirmationpassword: this.state.confirmationpassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:4000/auth/register", UserRequest)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          email: "",
          username: "",
          password: "",
          confirmationpassword: ""
        });
      });
  };

  render() {
    return (
      <Grid centered column={16}>
        <Grid.Column width={6}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Email</label>
              <input
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Email"
                name="email"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
                name="username"
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                onChange={this.handleChange}
                placeholder="Password"
                name="password"
                value={this.state.password}
                required
              />
            </Form.Field>
            <Form.Field>
              <label> Password Confirmation</label>
              <input
                value={this.state.confirmationpassword}
                onChange={this.handleChange}
                placeholder="Password confirmation"
                name="confirmationpassword"
                required
              />
            </Form.Field>
            <Form.Field />

            <Button primary type="submit">
              Submit
            </Button>
            <Button secondary>
              <Link to="/">Cancel</Link>{" "}
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserRegisterForm;
