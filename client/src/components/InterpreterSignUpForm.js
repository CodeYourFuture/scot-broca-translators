import React, { Component } from "react";
import { Button, Form, Grid, Header, Message, Card } from "semantic-ui-react";
import languageOptions from "./LanguageOptions";

const role = "Interpreter";
class InterpreterSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirmationPassword: "",
      languages: [],
      userCreated: false,
      error: false,
      errorMessage: false
    };
  }

  handleChange = (event, { value, name }) => {
    this.setState({
      [name]: value
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
    const {
      password,
      confirmationPassword,
      email,
      name,
      languages
    } = this.state;

    if (0 === name.length) {
      this.setState({
        error: true
      });
    } else {
      const interpreterRequest = {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          password,
          confirmationPassword,
          role,
          languages
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("/auth/register", interpreterRequest)
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
      email: "",
      name: "",
      password: "",
      confirmationPassword: "",
      languages: [],
      userCreated: true,
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
    return (
      <div>
        <Grid padded="horizontally" centered column={16}>
          <Grid.Column largeScreen="6" computer="10" mobile="16" tablet="10">
            <Header as="h1" icon textAlign="center">
              <Header.Content style={{ marginTop: "18px" }}>
                Translator Registration
              </Header.Content>
            </Header>
            <Card fluid style={{ marginTop: "4em", padding: "2em", width: "" }}>
              {this.state.hasErrors ? (
                <div>
                  <Message negative>
                    <Message.Header>An error occured</Message.Header>
                    <p>{this.state.errorMessage}</p>
                  </Message>
                </div>
              ) : null}

              {this.state.userCreated ? (
                <div>
                  <Message
                    success
                    header="Your user registration was successful"
                    content="You may now log-in with the username you have chosen"
                  />
                  <Button onClick={this.clickLogin} primary type="submit">
                    Login
                  </Button>
                </div>
              ) : (
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Form.Input
                      icon="user"
                      iconPosition="left"
                      label="Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      placeholder="Username"
                      name="name"
                      required
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <Form.Input
                      fluid
                      icon="envelope"
                      iconPosition="left"
                      label="Email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      label="Password"
                      onChange={this.handleChange}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      type="password"
                      label="Password confirmation"
                      value={this.state.confirmationPassword}
                      onChange={this.handleChange}
                      placeholder="Password confirmation"
                      name="confirmationPassword"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Dropdown
                      label="Languages"
                      value={this.state.languages}
                      name="languages"
                      onChange={this.handleChange}
                      options={languageOptions}
                      placeholder="Select Language"
                      multiple
                      selection
                      search
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
      </div>
    );
  }
}

export default InterpreterSignUpForm;
