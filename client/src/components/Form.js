import React, { Component } from "react";
import { Button, Checkbox, Form, Header } from "semantic-ui-react";

export class FormRig extends Component {
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
    // use fetch /auth/register with POST and body = state
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
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            placeholder="Email"
            name="email"
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
            name="username"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={this.handleChange}
            placeholder="Password"
            name="password"
            value={this.state.password}
          />
        </Form.Field>
        <Form.Field>
          <label> confirmationPassword</label>
          <input
            value={this.state.confirmationpassword}
            onChange={this.handleChange}
            placeholder="Password confirmation"
            name="confirmationpassword"
          />
        </Form.Field>
        <Form.Field>
          <label>Languages</label>
          <input
            value={this.state.languages}
            onChange={this.handleChange}
            placeholder="Languages"
            name="languages"
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
        <div>Form saved successfully</div>
      </Form>
    );
  }
}

export default FormRig;
