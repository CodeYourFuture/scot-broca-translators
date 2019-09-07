import React, { Component } from "react";
import { Header, Segment, Container, Button, Form } from "semantic-ui-react";
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
      name: ""
    };
  }
  handleSubmit = () => {
    postDocument(
      this.state.fromLanguage,
      this.state.toLanguage,
      this.state.name,
      this.state.due_date,
      this.state.text
    );
    this.setState({
      fromLanguage: "",
      toLanguage: "",
      dueDate: "",
      text: "",
      name: "",
      haveAllFieldsValue: false
    });
  };

  checkAllFields = () => {
    let haveAllFieldsValue = false;
    if (
      this.state.fromLanguage &&
      this.state.toLanguage &&
      this.state.text &&
      this.state.name
    ) {
      haveAllFieldsValue = true;
    }
    this.setState({ haveAllFieldsValue });
  };

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value }, () => this.checkAllFields());
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
      </Container>
    );
  }
}
// export const postDocument = (
//   fromLanguage,
//   toLanguage,
//   dueDate,
//   text,
//   name,
//   haveAllFieldsValue
// ) => {
//   const postParams = {
//     body: JSON.stringify({
//       fromLanguage,
//       toLanguage,
//       dueDate,
//       text,
//       name,
//       haveAllFieldsValue
//     })
//   };
export default AddDocumentForm;
