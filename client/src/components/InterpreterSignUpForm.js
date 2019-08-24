import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Select, Header } from "semantic-ui-react";
import languageOptions from "./LanguageOptions";

class InterpreterSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmationpassword: "",
      languages: [],
      userCreated: false
    };
  }
  handleChange = (event, { value, name }) => {
    this.setState({
      [name]: value
    });
    console.log(value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      password,
      confirmationpassword,
      email,
      username,
      languages
    } = this.state;
    // perform all neccassary validations
    if (password !== confirmationpassword) {
      alert("Passwords don't match");
    } else {
      // make API call
      const interpreterRequest = {
        method: "POST",
        body: JSON.stringify({
          email,
          username,
          password,
          confirmationpassword,
          languages
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("http://localhost:4000/auth/register", interpreterRequest)
        .then(res => res.json())
        .then(this.resetForm);
    }
  };
  resetForm = () => {
    this.setState({
      email: "",
      username: "",
      password: "",
      confirmationpassword: "",
      languages: [],
      userCreated: true
    });
  };
  handleClick = () => {
    window.location.href = "/";
  };
  render() {
    return (
      <div>
        {this.state.userCreated ? (
          <p> succeccful</p>
        ) : (
          <Grid centered column={16}>
            <Grid.Column width={6}>
              <Header as="h2" icon textAlign="center">
                <Header.Content style={textStyle}>
                  Interpreter Registration Form
                </Header.Content>
              </Header>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Form.Input
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
                    icon="user"
                    iconPosition="left"
                    label="Username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Username"
                    name="username"
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
                    value={this.state.confirmationpassword}
                    onChange={this.handleChange}
                    placeholder="Password confirmation"
                    name="confirmationpassword"
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

                <Button primary type="submit">
                  Submit
                </Button>
                <Button onClick={this.handleClick} secondary>
                  Cancel
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        )}
      </div>
    );
  }
}

export default InterpreterSignUpForm;

const textStyle = {
  fontSize: "25px",
  color: "black",
  fontFamily: "Helvetica, Arial, sansSerif",
  fontWeight: "bold"
};
