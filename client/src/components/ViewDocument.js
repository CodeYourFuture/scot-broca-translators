import React, { Component } from "react";
import { Header, Container, Segment } from "semantic-ui-react";
import DocumentInformationBar from "./DocumentInformationBar";
import { getDocumentById } from "../api/documents";
import { getTranslationById } from "../api/translations";

export class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      translation: []
    };
  }
  getTranslationData = (documentStatus, translationId) => {
    console.log(documentStatus, translationId);
    if (documentStatus === "Completed") {
      getTranslationById(translationId).then(translation => {
        console.log(translation);
        this.setState({ translation });
      });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getDocumentById(id).then(data => {
      this.setState(
        {
          document: data[0]
        },
        () => {
          this.getTranslationData(
            this.state.document.status,
            this.state.document.translation_id
          );
        }
      );
    });
  }

  render() {
    console.log(this.state);
    return (
      <Container>
        <Header as="h2">
          {this.state.document && this.state.document.name}
        </Header>
        {this.state.document && (
          <Segment>
            <DocumentInformationBar
              fromLanguageName={this.state.document.from_language_name}
              toLanguageName={this.state.document.to_language_name}
              status={this.state.document.status}
              ownerName={this.state.document.owner_name}
              submissionDate={this.state.document.submission_date}
              dueDate={this.state.document.due_date}
            />

            <p>{this.state.document.content}</p>
          </Segment>
        )}
      </Container>
    );
  }
}

export default ViewDocument;
