import React from "react";
import {
  Header,
  Grid,
  Segment,
  Icon,
  Card,
  Image,
  CardDescription
} from "semantic-ui-react";

const About = () => {
  return (
    <div>
      <Header as="h2" icon textAlign="centre">
        <Header.Content style={textStyle}>
          About Broca Translation
        </Header.Content>
      </Header>

      <Card
        centered
        image="resources/about.jpg"
        description="An app for a user-based network of volunteer interpreters/translators. Translators
          able to create profiles with the language they speak. The History
          Project (which is part of a real organisation) can upload chosen
          archival pieces to the app and requests their translation from
          volunteer interpreters.They can also upload invites and other texts
          for translation and distribution. Users can also use the app as a
          platform to upload texts or photos of texts in another language that
          they do not understand."
      />
    </div>
  );
};

export default About;

const textStyle = {
  fontSize: "20px",
  color: "black",
  fontFamily: "Helvetica, Arial, sansSerif",
  fontWeight: "bold"
};
