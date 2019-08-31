import React from "react";
import "../styles/Home.css";
import { Header, Button } from "semantic-ui-react";

const Home = props => {
  return (
    <div>
      <Header
        as="h1"
        textAlign="center"
        content="Broca Translation"
        image="http://www.24hourtranslation.com/wp-content/uploads/2010/04/global-translation.jpg"
        alt="site logo"
      />

      <img
        src="https://blogsensebybarb.files.wordpress.com/2014/03/happiness9-aristotle.jpg"
        className="homePageImg"
        alt="Lake with an Aristotle's quote"
      />
      <div className="information">
        <div className="parag-one">
          <p>
            An app to create a user-based network of volunteer
            interpreters/translators. Translators will be able to create
            profiles with the language they speak.The History Project (which is
            part of a real organisation) can upload chosen archival pieces to
            the app and requests translation.
          </p>
          <Button
            primary
            content="Sign Up"
            onClick={() => {
              props.history.push(`/sign-up-user/`);
            }}
          />
        </div>
        <div className="parag-two">
          <p>
            They can also upload invites and other texts for translation and
            distribution. As a stretch goal, Users can also use the app as a
            platform to upload texts or photos of texts in another language that
            they do not understand, including what we commonly nickname
            “legalese”.
          </p>
          <Button
            primary
            content="Become an Interprter"
            onClick={() => {
              props.history.push(`/sign-up-interpreter/`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
