import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";

export class UserSignUpForm extends Component {
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
      const userRequest = {
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
      fetch("http://localhost:4000/auth/register", userRequest)
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
      userSignUp: true
    });
  };
  clickLogin = () => {
    window.location.href = "/login";
  };
  render() {
    return (
      <Grid centered column={16}>
        <Grid.Column width={6}>
          <Header as="h1" textAlign="center">
            User Registration
          </Header>
          {this.state.userSignUp ? (
            <div>
              <Message
                success
                header="Your user registration was successful"
                content="You may now log-in with the username you have chosen"
              />
              <Button onClick={this.clickLogin}>Login</Button>
            </div>
          ) : (
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
                <Link to="/">Cancel</Link>
              </Button>
            </Form>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserSignUpForm;
