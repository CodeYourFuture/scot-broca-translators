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
              <List.Item as="a">Mohamed Lafiteh</List.Item>
              <List.Item as="a">Viktoriia Kosenko</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={7}>
            <Header as="h4" inverted>
              Broca Translation
            </Header>
            <p>
              Broca Translation is an open source project hosted on <Icon name="github" /> <a title="github"
                className="footerStyle"
                href="https://github.com/CodeYourFuture/scot-broca-translators"> Github.</a>
              <br />
              Thanks to <a
                title="smashicons"
                className="footerStyle"
                href="https://www.flaticon.com/authors/smashicons>Smashicons"> Smashicons </a>for the logo and to<a
                  title="unsplash"
                  className="footerStyle"
                  href="https://unsplash.com/"> Unsplash </a>for the free images.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);
