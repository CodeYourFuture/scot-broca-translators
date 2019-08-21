import React from "react";
import "../styles/Home.css";
import { Header } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <h1>Broca Translation</h1>
      </header>
      <img
        src="http://www.24hourtranslation.com/wp-content/uploads/2010/04/global-translation.jpg"
        alt="logo"
        className="logo"
      />
      <button className="loginButton">Login here</button>;
      <img
        src="https://blogsensebybarb.files.wordpress.com/2014/03/happiness9-aristotle.jpg"
        className="homePageImg"
      />
      <div>
        <p className="land-p-one">
          An app to create a user-based network of volunteer
          interpreters/translators. Translators will be able to create profiles
          with the language they speak.
          <br /> The History Project (which is part of a real organisation) can
          upload chosen archival pieces to the app and requests their
          translation from volunteer interpreters.
        </p>
        <p className="land-p-two">
          They can also upload invites and other texts for translation and
          distribution. As a stretch goal, Users can also use the app as a
          platform to upload texts or photos of texts in another language that
          they do not understand, including what we commonly nickname
          “legalese”.
        </p>
      </div>
      <button className="signUp">Sign Up</button>
      <button className="interpreter">Become an Interpreter</button>
    </div>
  );
};

export default Home;
