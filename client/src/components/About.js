import React from "react";
import { Header, Icon, Grid } from "semantic-ui-react";

const About = () => {
  return (
    <div>
 
      <Header as="h2" icon textAlign="left">
        <Icon name="users" />
        <Header.Content style={textStyle}>
          About Us: Broca Group Project
        </Header.Content>
      </Header>

      <p style={textStyle}>
        Translators/interpreters network: <br />
        An app for a user-based network of volunteer interpreters/translators.
        Translators able to create profiles with the language they speak.
        <br /> The History Project (which is part of a real organisation) can
        upload chosen archival pieces to the app and requests their translation
        <br />
        from volunteer interpreters.They can also upload invites and other texts
        for translation and distribution.
        <br /> Users can also use the app as a platform to upload texts or
        photos of texts in another language that they do not understand. <br />
     
    </div>
  );
};

export default About;

const textStyle = {
  fontSize: "14px",
  color: "black",
  fontFamily: "Helvetica, Arial, sansSerif",
  fontWeight: "bold"
};
