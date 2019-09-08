import React, { Component } from "react";
import { Header, Segment, Container, Button, Form } from "semantic-ui-react";
import { getDocumentById } from "../api/documents";
import documentInformationBar from "./DocumentInformationBar";

export class AddTranslationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      content: ""
    };
  }

  componentDidMount() {
    let documentId = this.props.match.params.documentId;
    getDocumentById(documentId)
      .then(document => {
        this.setState({ document: document });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("submit was clicked");
  };

  render() {
    const { content } = this.state;
    return (
      <Container>
        <Header as="h2">
          Submit translation for{" "}
          <i> {this.state.document[0] && this.state.document[0].name}</i>
        </Header>

        <Segment>
          <Form>
            <Form.Group>
              {this.state.document[0] &&
                documentInformationBar(this.state.document[0])}
            </Form.Group>

            <Form.TextArea
              rows={20}
              required
              placeholder="Please, enter the translation here..."
              name="content"
              value={content}
              onChange={this.handleChange}
            />

            <Form.Group>
              {content.length ? (
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

export default AddTranslationForm;
