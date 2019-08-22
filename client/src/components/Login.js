import React, { Component } from "react";
import { Form, Input, Button, Segment, Grid, Header } from "semantic-ui-react";
import { getToken } from "../api/status";

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
    getToken(email, password)
      .then(res => sessionStorage.setItem("token", res.token))
      .catch(err => {
        this.setState({ loginErr: true });
        console.log(this.state);
      });
  };

  render() {
    const { email, password, loginErr } = this.state;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Header as="h2" textAlign="center">
            Login
          </Header>
          <Segment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Form.Field inline>
                <Grid>
                  <Grid.Column textAlign="center">
                    <label>Email</label>
                    <Input
                      placeholder="nnn@nn.com"
                      onChange={this.handleChange}
                      name="email"
                      value={email}
                      type="email"
                    />
                  </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field inline>
                <Grid>
                  <Grid.Column textAlign="center">
                    <label>Password</label>
                    <Input
                      placeholder="******"
                      onChange={this.handleChange}
                      name="password"
                      value={password}
                      type="password"
                    />
                  </Grid.Column>
                </Grid>
              </Form.Field>

              <Grid>
                <Grid.Column textAlign="center">
                  {loginErr ? (
                    <p>Something went wrong! Please check email or password!</p>
                  ) : null}
                  <Button type="submit" content="Submit" primary />
                  <Button
                    content="Cancel"
                    secondary
                    onClick={() => {
                      this.props.history.push(`/`);
                    }}
                  />
                </Grid.Column>
              </Grid>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
