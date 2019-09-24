import React from "react";
import "../styles/Home.css";
import { Header, Button, Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home = props => {
  return (
    <div>
      <div className="mainImage">
        <img
          src="https://trello-attachments.s3.amazonaws.com/5d571bc33416048d79622ed3/5d86265957abda1d0d4f6e3b/ae9c599fe9420c053e5195a872c25eed/hero-broca.jpg"
          alt="open book"
        />
      </div>
      <Header
        size="huge"
        textAlign="center"
        content="Welcome to Broca Translation"
      />
      <Card.Group centered>
        <Card>
          <Card.Content>
            <Card.Header>
              Do you need a translation ? {""}
              <Icon name="translate" size="small" className="myIcon" circular />
            </Card.Header>

            <Card.Description>
              Join the Broca community and connect with interpreters all around
              the world. Right after creating an account, you can submit any
              text documents and request a translation from our growing
              community of volunteer interpreters.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>
              already have an account?
              <Link to={`/login`} style={{ textDecoration: "underline" }}>
                login
              </Link>
            </Card.Meta>
            <Button
              fluid
              primary
              content="Sign Up"
              onClick={() => {
                props.history.push(`/sign-up-user/`);
              }}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              Help us translating! {""}{" "}
              <Icon name="write" className="myIcon" size="small" circular />
            </Card.Header>

            <Card.Description>
              Are you a talented interpreter? Do you speak several languages? If
              yes, we want to hear from you! Join our team of interpreters and
              help the Broca community to translate a various range of text
              documents.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Meta>
              already have an account?
              <Link to={`/login`} style={{ textDecoration: "underline" }}>
                login
              </Link>
            </Card.Meta>
            <Button
              fluid
              primary
              content="Become a Translator"
              onClick={() => {
                props.history.push(`/sign-up-interpreter/`);
              }}
            />
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <Card.Header>
              Supported languages {""}{" "}
              <Icon name="world" className="myIcon" size="small" circular />
            </Card.Header>

            <Card.Description>
              <ul>
                <li>Arabic</li>
                <li>Bengali</li>
                <li>English</li>
                <li>French</li>
                <li>Malaysian</li>
                <li>Mandarin Chinese</li>
                <li>Russian</li>
                <li>Spanish</li>
              </ul>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
};

export default Home;
