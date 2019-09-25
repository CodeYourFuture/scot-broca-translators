import "semantic-ui-css/semantic.min.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./components/Home";
import About from "./components/About";
import Status from "./components/Status";
import UserSignUpForm from "./components/UserSignUpForm";
import InterpreterSignUpForm from "./components/InterpreterSignUpForm";
import AddDocumentForm from "./components/AddDocumentForm";
import Dashboard from "./components/Dashboard";
import AddTranslationForm from "./components/AddTranslationForm";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import { isLoggedIn } from "./components/helpers/isLoggedIn";
import { isUser } from "./components/helpers/isUser";
import ViewDocument from "./components/ViewDocument";

import NavBar from "./components/navbar/NavBar";

import { Footer } from "./Footer";

class Routes extends Component {
  render() {
    return (
      <Router>

        <NavBar>
    
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/status/" component={Status} />
            <Route path="/sign-up-user/" component={UserSignUpForm} />
            <Route path="/login/" component={Login} />
            <Route
              path="/sign-up-interpreter/"
              component={InterpreterSignUpForm}
            />
            {isLoggedIn() ? (
              <div>
                <Route path="/add-document/" component={AddDocumentForm} />
                <Route path="/dashboard" component={Dashboard} />
                {isUser() ? null : (
                  <Route
                    path="/add-document-translation/:documentId"
                    component={AddTranslationForm}
                  />
                )}
                <Route path="/document/:id" component={ViewDocument} />
              </div>
            ) : null}
          </div>
        </NavBar>
        <Footer />
      </Router>
    );
  }
}

ReactDOM.render(<Routes />, document.getElementById("root"));
