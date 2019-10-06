import React, { Component } from "react";
import { Form, Input, Button, Segment, Grid, Header } from "semantic-ui-react";
import { getToken } from "../api/status";
import { Link } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErr: false
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log("hi");
    getToken(email, password)
      .then(res => {
        console.log(res.user);
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("userName", res.user.name);
        sessionStorage.setItem("userRole", res.user.role);
        window.location.href = "/dashboard";
      })
      .catch(err => {
        this.setState({ loginErr: true });
      });
  };

  render() {
    const { email, password, loginErr } = this.state;
    return (
      <Grid padded="horizontally" centered columns={16}>
        <Grid.Column largeScreen="6" computer="10" mobile="16" tablet="10">
          <Header as="h2" textAlign="center">
            Log-in to your account
          </Header>

          <Segment secondary>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Field inline>
                <Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail Address"
                  onChange={this.handleChange}
                  name="email"
                  value={email}
                  type="email"
                />
              </Form.Field>

              <Form.Field inline>
                <Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  onChange={this.handleChange}
                  name="password"
                  value={password}
                  type="password"
                />
              </Form.Field>

              {loginErr ? (
                <p>Something went wrong! Please check email or password!</p>
              ) : null}
              <Button fluid type="submit" content="Login" primary />
            </Form>
          </Segment>
          <Segment size="small" secondary textAlign="center">
            New to us ?
            <Link to={`/sign-up-user/`}>
              <span> Sign up </span>
            </Link>{" "}
            or
            <Link to={`/sign-up-interpreter/`}>
              <span> become a translator</span>
            </Link>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
