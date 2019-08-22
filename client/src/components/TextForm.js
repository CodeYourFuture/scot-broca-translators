import React, { Component } from "react";
import { Header, Container, Button, Form } from "semantic-ui-react";

const languages = [
  { key: "Rus", text: "Russian", value: "Russian" },
  { key: "Spa", text: "Spanish", value: "Spanish" },
  { key: "Swe", text: "Swedish", value: "Swedish" },
  { key: "Tur", text: "Turkish", value: "Turkish" },
  { key: "Viet", text: "Vietnamese", value: "Vietnamese" }
];

class TextForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromLanguage: "",
      toLanguage: "",
      dateSubmited: "",
      dueDate: "",
      text: ""
    };
  }
  handleSubmit = () => {
    console.log(this.state);
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChang = (e, { value }) => {
    this.setState({ fromLanguage: value });
  };
  render() {
    const { value } = this.state;
    return (
      <Container>
        <Header as="h2">
          To get your text translated, you need to fill in the form
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Dropdown
              label="From"
              onChange={this.handleChang}
              options={languages}
              placeholder="Choose an language"
              selection
              name="fromLanguage"
              value={value}
              required
            />
            <Form.Dropdown
              label="To"
              onChange={this.handleChang}
              options={languages}
              placeholder="Choose an language"
              selection
              name="toLanguage"
              value={value}
              required
            />

            <Form.Input
              fluid
              label="Due date"
              type="date"
              name="dueDate"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            required
            label="Text to be translated"
            placeholder="Please, put your text here..."
            name="text"
            onChange={this.handleChange}
          />
          <Form.Group>
            <Button color="blue" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button color="grey">Clear</Button>
            <Button color="black">Cancel</Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default TextForm;
