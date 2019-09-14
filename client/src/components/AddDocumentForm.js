import React, { Component } from "react";
import {
  Header,
  Segment,
  Container,
  Button,
  Form,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import languageOptions from "./LanguageOptions";
import { postDocument } from "../api/documents";

class AddDocumentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromLanguage: "",
      toLanguage: "",
      haveAllFieldsValue: false,
      dueDate: "",
      text: "",
      name: "",
      haveAllFieldsValue: false,
      documentCreated: false,
      error: false,
      errorMessage: false
    };
  }
  handleErrors(response) {
    return response.json().then(json => {
      if (!response.ok) {
        throw json.message;
      } else {
        return json;
      }
    });
  }
  handleSubmit = e => {
    e.preventDefault();
    postDocument(
      this.state.fromLanguage,
      this.state.toLanguage,
      this.state.name,
      this.state.dueDate,
      this.state.text
    )
      .then(data => {
        if (data === 200) {
          this.setState({ hasErrors: false, documentCreated: true });
        } else {
          this.setState({ hasErrors: true });
        }
      })
      .catch(error => {
        this.state.hasErrors = true;
      });

    this.setState({
      fromLanguage: "",
      toLanguage: "",
      dueDate: "",
      text: "",
      name: "",
      haveAllFieldsValue: false,
      errorMessage: false
    });
  };

  checkAllFields = () => {
    const haveAllFieldsValue =
      this.state.fromLanguage &&
      this.state.toLanguage &&
      this.state.text &&
      this.state.name;
    this.setState({ haveAllFieldsValue });
  };

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value }, () => this.checkAllFields());
  };

  resetForm = () => {
    this.setState({
      fromLanguage: "",
      dueDate: "",
      text: "",
      name: "",
      haveAllFieldsValue: true,
      hasErrors: false,
      documentCreated: true
    });
  };

  clickDashboard = () => {
    window.location.href = "dashboard";
  };

  render() {
    const {
      fromLanguage,
      toLanguage,
      dueDate,
      text,
      name,
      haveAllFieldsValue
    } = this.state;

    return (
      <Container>
        <Header as="h2">Add document</Header>
        {this.state.hasErrors ? (
          <div>
            <Message negative>
              <Message.Header>An error occured</Message.Header>
              <p>{this.state.errorMessage}</p>
            </Message>
          </div>
        ) : null}
        {this.state.documentCreated ? (
          <div>
            <Message
              success
              header="Your document has been successfully recorded in the system"
              content="You may go to the dashboard to view the document"
            />
            <Link to="/Dashboard">Back to dashboard</Link>
          </div>
        ) : (
          <Segment>
            <Form>
              <Form.Field as="p">
                To get your text translated, you need to fill in the form
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Dropdown
                  label="From"
                  onChange={this.handleChange}
                  options={languageOptions}
                  placeholder="Choose an language"
                  selection
                  value={fromLanguage}
                  required
                  name="fromLanguage"
                />
                <Form.Dropdown
                  label="To"
                  onChange={this.handleChange}
                  options={languageOptions}
                  placeholder="Choose an language"
                  selection
                  name="toLanguage"
                  value={toLanguage}
                  required
                />

                <Form.Input
                  fluid
                  label="Due date"
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Input
                fluid
                label="Document Name"
                type="text"
                name="name"
                placeholder="Please enter text name"
                value={name}
                required
                onChange={this.handleChange}
              />
              <Form.TextArea
                required
                label="Text to be translated"
                placeholder="Please, put your text here..."
                name="text"
                value={text}
                onChange={this.handleChange}
              />

              <Form.Group>
                {haveAllFieldsValue ? (
                  <Form.Button color="blue" onClick={this.handleSubmit}>
                    Submit
                  </Form.Button>
                ) : (
                  <Button color="blue" disabled>
                    Submit
                  </Button>
                )}

                <Button
                  color="black"
                  onClick={() => this.props.history.push("/dashboard")}
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Segment>
        )}
      </Container>
    );
  }
}

export default AddDocumentForm;
