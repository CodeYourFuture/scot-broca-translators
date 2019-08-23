import React from "react";
import "../styles/Home.css";
import { Header } from "semantic-ui-react";

const Home = () => {
  return (
    <div>
      <header className="home-header">
        <Header as="h1">Broca Translation</Header>
      </header>
    </div>
  );
};

export default Home;
