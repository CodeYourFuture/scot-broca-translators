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
      dateSubmited: new Date().toDateString(),
      dueDate: "",
      text: ""
    };
  }
  handleSubmit = () => {
    console.log(this.state);
  };

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value });
  };

  render() {
    let { value } = this.state;
    return (
      <Container>
        <Header as="h2">
          To get your text translated, you need to fill in the form
        </Header>
        <Form>
          <Form.Group widths="equal">
            <Form.Dropdown
              label="From"
              onChange={this.handleChange}
              options={languages}
              placeholder="Choose an language"
              selection
              value={value}
              required
              name="fromLanguage"
            />
            <Form.Dropdown
              label="To"
              onChange={this.handleChange}
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
              value={value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.TextArea
            required
            label="Text to be translated"
            placeholder="Please, put your text here..."
            name="text"
            value={value}
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
