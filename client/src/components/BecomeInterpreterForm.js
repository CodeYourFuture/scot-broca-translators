import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Dropdown } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";

const languageOptions = [
  { key: "Arabic", text: "Arabic", value: "Arabic" },
  { key: "Chinese", text: "Chinese", value: "Chinese" },
  { key: "Danish", text: "Danish", value: "Danish" },
  { key: "Dutch", text: "Dutch", value: "Dutch" },
  { key: "English", text: "English", value: "English" },
  { key: "French", text: "French", value: "French" },
  { key: "German", text: "German", value: "German" },
  { key: "Greek", text: "Greek", value: "Greek" },
  { key: "Hungarian", text: "Hungarian", value: "Hungarian" },
  { key: "Italian", text: "Italian", value: "Italian" },
  { key: "Japanese", text: "Japanese", value: "Japanese" },
  { key: "Korean", text: "Korean", value: "Korean" },
  { key: "Lithuanian", text: "Lithuanian", value: "Lithuanian" },
  { key: "Persian", text: "Persian", value: "Persian" },
  { key: "Polish", text: "Polish", value: "Polish" },
  { key: "Portuguese", text: "Portuguese", value: "Portuguese" },
  { key: "Russian", text: "Russian", value: "Russian" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
  { key: "Swedish", text: "Swedish", value: "Swedish" },
  { key: "Turkish", text: "Turkish", value: "Turkish" },
  { key: "Vietnamese", text: "Vietnamese", value: "Vietnamese" }
];

export class BecomeInterpreterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmationpassword: "",
      languages: "",
      userCreated: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(this.state);
  };
  handleSubmit = e => {
    e.preventDefault();
    const { password, confirmationpassword } = this.state;
    // perform all neccassary validations
    if (password !== confirmationpassword) {
      alert("Passwords don't match");
    } else {
      // make API call
      const interpreterRequest = {
        method: "POST",
        body: JSON.stringify({
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          confirmationpassword: this.state.confirmationpassword,
          languages: this.state.languages
        }),
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch("http://localhost:4000/auth/register", interpreterRequest)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({
            email: "",
            username: "",
            password: "",
            confirmationpassword: "",
            languages: "",
            userCreated: true
          });
        });
    }
  };
  // use fetch /auth/register with POST and body = state

  render() {
    let userCreateAcount;
    if (this.state.userCreated) {
      userCreateAcount = "You are registered succsefully";
    } else {
      userCreateAcount = null;
    }

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
              <label> confirmationPassword</label>
              <input
                value={this.state.confirmationpassword}
                onChange={this.handleChange}
                placeholder="Password confirmation"
                name="confirmationpassword"
                required
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                button
                className="icon"
                floating
                labeled
                icon="world"
                options={languageOptions}
                search
                text="Select Language"
                required
              />
            </Form.Field>

            <Button primary type="submit">
              Submit
            </Button>
            <Button secondary>
              <Link to="/">Cancel</Link>{" "}
            </Button>
            <h1>{userCreateAcount}</h1>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default BecomeInterpreterForm;
