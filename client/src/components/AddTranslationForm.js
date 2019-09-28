import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Header,
  Segment,
  Container,
  Button,
  Form,
  Message,
  Table
} from "semantic-ui-react";
import { getDocumentById } from "../api/documents";
import { putTranslation } from "../api/translations";
import DocumentInformationBar from "./DocumentInformationBar";

export class AddTranslationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      content: "",
      submitErr: false,
      isSend: false,
      errorMessage: ""
    };
  }

  componentDidMount() {
    let documentId = this.props.match.params.documentId;
    getDocumentById(documentId)
      .then(document => {
        this.setState({ document: document });
      })
      .catch(err =>
        this.setState({ errorMessage: "Unable to retrieve document data" })
      );
  }

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value, isSend: false, submitErr: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { translation_id } = this.state.document[0];
    const { content } = this.state;
    putTranslation(translation_id, content)
      .then(res => this.setState({ isSend: true, content: "" }))
      .catch(err => {
        err.text().then(errorMessage => this.setState({ errorMessage }));
      });
  };

  render() {
    const { content, errorMessage } = this.state;
    return (
      <Container>
        <Header as="h2">
          Submit translation for
          <i> {this.state.document[0] && this.state.document[0].name}</i>
        </Header>

        <Segment>
          <Form>
            <Form.Group>
              <Table celled structured>
                <Table.Header fullWidth>
                  {this.state.document[0] && (
                    <DocumentInformationBar
                      fromLanguageName={
                        this.state.document[0].from_language_name
                      }
                      toLanguageName={this.state.document[0].to_language_name}
                      status={this.state.document[0].status}
                      ownerName={this.state.document[0].owner_name}
                      submissionDate={this.state.document[0].submission_date}
                      dueDate={this.state.document[0].due_date}
                    />
                  )}
                </Table.Header>
              </Table>
            </Form.Group>

            {errorMessage.length ? (
              <Message negative>
                <Message.Header>An error occurred</Message.Header>
                <p>{errorMessage}</p>
              </Message>
            ) : null}
            {this.state.isSend ? (
              <Message positive>
                <Message.Header>
                  Your translation has been submitted successfully!
                </Message.Header>
                <Link to={`/dashboard`}>
                  <p>Go to Dashboard</p>
                </Link>
              </Message>
            ) : null}

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
