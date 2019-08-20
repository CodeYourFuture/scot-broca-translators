import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Dropdown, Grid } from "semantic-ui-react";

const languageOptions = [
  { key: "Ar", text: "Arabic", value: "Arabic" },
  { key: "Chi", text: "Chinese", value: "Chinese" },
  { key: "Dan", text: "Danish", value: "Danish" },
  { key: "Dut", text: "Dutch", value: "Dutch" },
  { key: "En", text: "English", value: "English" },
  { key: "Fre", text: "French", value: "French" },
  { key: "Ger", text: "German", value: "German" },
  { key: "Grek", text: "Greek", value: "Greek" },
  { key: "Hun", text: "Hungarian", value: "Hungarian" },
  { key: "Ita", text: "Italian", value: "Italian" },
  { key: "Jap", text: "Japanese", value: "Japanese" },
  { key: "Kor", text: "Korean", value: "Korean" },
  { key: "Lith", text: "Lithuanian", value: "Lithuanian" },
  { key: "Per", text: "Persian", value: "Persian" },
  { key: "Pol", text: "Polish", value: "Polish" },
  { key: "Por", text: "Portuguese", value: "Portuguese" },
  { key: "Rus", text: "Russian", value: "Russian" },
  { key: "Spa", text: "Spanish", value: "Spanish" },
  { key: "Swe", text: "Swedish", value: "Swedish" },
  { key: "Tur", text: "Turkish", value: "Turkish" },
  { key: "Viet", text: "Vietnamese", value: "Vietnamese" }
];

class InterpreterSignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      confirmationpassword: "",
      languages: [],
      userCreated: null
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
          password,
          confirmationpassword,
          languages: this.state.languages
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
    let userCreateAcount;
    if (this.state.userCreated) {
      userCreateAcount = "You are registered successfully";
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

export default InterpreterSignUpForm;
