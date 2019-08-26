import React, { Component } from "react";
import { Header, Segment, Container, Button, Form } from "semantic-ui-react";
import languageOptions from "./LanguageOptions";

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromLanguage: "",
      toLanguage: "",
      haveAllFielsValue: false,
      dueDate: "",
      text: ""
    };
  }

  handleSubmit = () => {
    console.log(this.state);
    this.setState({
      fromLanguage: "",
      toLanguage: "",
      dueDate: "",
      text: "",
      haveAllFielsValue: false
    });
    console.log(this.state);
  };

  checkAllFields = () => {
    let haveAllFielsValue = false;
    if (this.state.fromLanguage && this.state.toLanguage && this.state.text) {
      haveAllFielsValue = true;
    }
    this.setState({ haveAllFielsValue: haveAllFielsValue });
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
      haveAllFielsValue
    } = this.state;

    return (
      <Container>
        <Header as="h2">
          To get your text translated, you need to fill in the form
        </Header>

        <Segment>
          <Form>
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

            <Form.TextArea
              required
              label="Text to be translated"
              placeholder="Please, put your text here..."
              name="text"
              value={text}
              onChange={this.handleChange}
            />

            <Form.Group>
              {haveAllFielsValue ? (
                <Form.Button color="blue" onClick={this.handleSubmit}>
                  Submit
                </Form.Button>
              ) : (
                <Button color="blue" disabled>
                  Submit
                </Button>
              )}
              <Button color="grey">Clear</Button>
              <Button color="black">Cancel</Button>
            </Form.Group>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default TextForm;
