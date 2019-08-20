import React, { Component } from "react";
import { Form, Input, Button, Segment, Grid, Header } from "semantic-ui-react";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submit");
  };
  render() {
    const { email, password } = this.state;
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
                    />
                  </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field inline>
                <Grid>
                  <Grid.Column textAlign="center">
                    <Button content="Cancel" secondary />
                    <Button type="submit" content="Submit" primary />
                  </Grid.Column>
                </Grid>
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
