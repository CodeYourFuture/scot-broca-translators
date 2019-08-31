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
      role: "",
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
          role: this.state.role
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("http://localhost:4000/auth/register", userRequest)
        .then(res => res.json())
        .then(this.resetForm)
        .catch(error => (
          <Message negative>
            <Message.Header>
              We're sorry, we can't create your account
            </Message.Header>
            <p>{error}</p>
          </Message>
        ));
    }
  };
  resetForm = () => {
    this.setState({
      name: "",
      email: "",
      password: "",
      confirmationPassword: "",
      role: "User",
      userSignUp: true
    });
  };
  clickLogin = () => {
    window.location.href = "/login";
  };
  render() {
    const { email, name, password, confirmationPassword } = this.state;
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
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  onChange={this.handleChange}
                  value={name}
                  placeholder="Name"
                  name="name"
                  label="Name"
                  required
                />

                <Form.Input
                  icon="envelope"
                  iconPosition="left"
                  onChange={this.handleChange}
                  value={email}
                  label="Email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  onChange={this.handleChange}
                  placeholder="Password"
                  label="Password"
                  name="password"
                  value={password}
                  required
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="password"
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  value={confirmationPassword}
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
