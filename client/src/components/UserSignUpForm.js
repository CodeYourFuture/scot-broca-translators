import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Card } from "semantic-ui-react";

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

  handleErrors(response) {
    return response.json().then(json => {
      if (!response.ok) {
        throw json.message;
      } else {
        return json;
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmationPassword } = this.state;
    if (password !== confirmationPassword) {
      alert("passwords don't match");
    } else {
      const userRequest = {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          password: this.state.password,
          role: "User"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("/auth/register", userRequest)
        .then(this.handleErrors)
        .then(this.resetForm)
        .catch(error => {
          this.setState({
            hasErrors: true,
            errorMessage: error
          });
        });
    }
  };
  resetForm = () => {
    this.setState({
      userSignUp: true,
      name: "",
      email: "",
      password: "",
      confirmationPassword: "",
      hasErrors: false
    });
  };
  handleCancelClick = () => {
    window.location.href = "/";
  };
  clickLogin = () => {
    window.location.href = "/login";
  };
  render() {
    const { email, name, password, confirmationPassword } = this.state;
    return (
      <Grid padded="horizontally" centered column={16}>
        <Grid.Column largeScreen="6" computer="10" mobile="16" tablet="10">
          <Header as="h1" textAlign="center">
            <Header.Content style={{ marginTop: "20px" }}>
              User Registration
            </Header.Content>
          </Header>
          <Card style={{ marginTop: "4em", padding: "2em", width: "100%" }}>
            {this.state.hasErrors ? (
              <Message negative>
                <Message.Header>An error occurred</Message.Header>
                <p>{this.state.errorMessage}</p>
              </Message>
            ) : null}
            {this.state.userSignUp ? (
              <div>
                <Message
                  success
                  header="Your user registration was successful"
                  content="You may now log-in with the email you have chosen"
                />
                <Button onClick={this.clickLogin}>Login</Button>
              </div>
            ) : (
              <Form onSubmit={this.handleSubmit}>
                <Form.Field inline>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    onChange={this.handleChange}
                    value={name}
                    placeholder="Name"
                    name="name"
                    label="Name"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    fluid
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
                <Form.Field inline>
                  <Form.Input
                    fluid
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
                <Form.Field inline>
                  <Form.Input
                    fluid
                    type="password"
                    icon="lock"
                    iconPosition="left"
                    label="Password Confirmation"
                    value={confirmationPassword}
                    onChange={this.handleChange}
                    placeholder="Password confirmation"
                    name="confirmationPassword"
                    required
                  />
                </Form.Field>
                <Button.Group fluid>
                  <Button onClick={this.handleCancelClick}>Cancel</Button>

                  <Button.Or />
                  <Button primary type="submit">
                    Submit
                  </Button>
                </Button.Group>
              </Form>
            )}
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserSignUpForm;
