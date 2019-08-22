import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";

export class UserSignUp extends Component {
  state = {
    Email: "",
    UserName: "",
    Password: "",
    Password_Confirmation: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const userRequest = {
      method: "POST",
      body: JSON.stringify({
        Email: this.state.email,
        Username: this.state.username,
        Password: this.state.password,
        Password_Confirmation: this.state.Password_Confirmation
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch("http://localhost:4000/auth/register", userRequest)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          Email: "",
          Username: "",
          Password: "",
          Password_confirmation: ""
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
            name="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Username"
            name="Username"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            onChange={this.handleChange}
            placeholder="Password"
            name="Password"
            value={this.state.password}
          />
        </Form.Field>
        <Form.Field>
          <label> Password_Confirmation</label>
          <input
            value={this.state.confirmationpassword}
            onChange={this.handleChange}
            placeholder="Password confirmation"
            name="Password_confirmation"
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

export default UserSignUp;
