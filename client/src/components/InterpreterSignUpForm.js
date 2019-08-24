import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Grid, Select } from "semantic-ui-react";
import languageOptions from "./LanguageOptions";

class InterpreterSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmationpassword: "",
      languages: "",
      userCreated: false
    };
  }
  handleChangeForLanguages = (event, { value }) => {
    this.setState({
      languages: value
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
  render() {
    return (
      <div>
        {this.state.userCreated ? (
          <p> succeccful</p>
        ) : (
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
                  <label> Password confirmation</label>
                  <input
                    value={this.state.confirmationpassword}
                    onChange={this.handleChange}
                    placeholder="Password confirmation"
                    name="confirmationpassword"
                    required
                  />
                </Form.Field>
                <Form.Field>
                  <Select
                    value={this.state.languages}
                    name="languages"
                    onChange={this.handleChangeForLanguages}
                    options={languageOptions}
                    placeholder="Select Language"
                    required
                  />
                </Form.Field>

                <Button primary type="submit">
                  Submit
                </Button>
                <Button secondary>
                  <Link to="/">Cancel</Link>{" "}
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
