import React from "react";
import {
  Container,
  Header,
  List,
  Grid,
  Segment,
  Icon
} from "semantic-ui-react";

export const Footer = () => (
  <Segment inverted vertical style={{ marginTop: "5em" }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Team" />
            <List link inverted>
              <List.Item as="a">Adnan Oglah</List.Item>
              <List.Item as="a">Blaise Lubuma</List.Item>
              <List.Item as="a">Mariama Sillah</List.Item>
              <List.Item as="a">Mohammed Lafiteh</List.Item>
              <List.Item as="a">Victoria Kosenko</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Broca Translation
            </Header>
            <p>
              Broca Translation is an open source project hosted on
              {""} <Icon name="github" />
              <a
                href="https://github.com/CodeYourFuture/scot-broca-translators"
                style={{ textDecoration: "underline", color: "white" }}
              >
                Github.
              </a>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);
