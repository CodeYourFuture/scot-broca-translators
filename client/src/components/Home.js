import React from "react";
import "../styles/Home.css";
import { Header } from "semantic-ui-react";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        {/* <h1>
          Graduation Project skeleton
        </h1> */}

        <Header as="h1">Hello, Graduation Project</Header>
      </header>
    </div>
  );
};

export default Home;
