import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid } from "semantic-ui-react";

export class UserRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmationPassword: "",
      userSignUp: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmationPassword } = this.state;
    if (password !== confirmationPassword) {
      alert("passwords dont match");
    } else {
      const UserRequest = {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          confirmationPassword: this.state.confirmationPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("http://localhost:4000/auth/register", UserRequest)
        .then(res => res.json())
        .then(this.resetForm);
    }
  };
  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      confirmationPassword: "",
      userSignUp: "true"
    });
  };
  render() {
    let userSignUp;
    if (this.state.userSignUp) {
      userSignUp = "User Logged in successfully";
    } else {
      userSignUp = null;
    }
    return (
      <Grid centered column={16}>
        <Grid.Column width={6}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Name"
                name="name"
                required
              />
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
                value={this.state.confirmationPassword}
                onChange={this.handleChange}
                placeholder="Password confirmation"
                name="confirmationPassword"
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
            <h1>{userSignUp}</h1>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserRegisterForm;
