import React, { Component } from "react";
import {
  Header,
  Container,
  Segment,
  Table,
  Grid,
  Icon
} from "semantic-ui-react";
import DocumentInformationBar from "./DocumentInformationBar";
import { getDocumentById } from "../api/documents";
import { getTranslationById } from "../api/translations";
import TranslationInfoBar from "./TranslationInfoBar";
import { Link } from "react-router-dom";

const DocumentTranslationContent = ({ document, translation }) => {
  return (
    <Container>
      {translation ? (
        <Grid stackable columns={2} divided>
          <Grid.Column as="p">{document}</Grid.Column>
          <Grid.Column as="p">{translation}</Grid.Column>
        </Grid>
      ) : (
        <p className="text">{document}</p>
      )}
    </Container>
  );
};

export class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: [],
      translation: null
    };
  }
  getTranslationData = (documentStatus, translationId) => {
    if (documentStatus === "Completed") {
      getTranslationById(translationId).then(translation => {
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
    let translationContent;
    this.state.translation
      ? (translationContent = this.state.translation.content)
      : (translationContent = "");
    return (
      <Container>
        {this.state.document && (
          <Segment>
            <Header as="h2">
              {this.state.document && this.state.document.name}
            </Header>

            <Table celled structured>
              <Table.Header fullWidth>
                <DocumentInformationBar
                  fromLanguageName={this.state.document.from_language_name}
                  toLanguageName={this.state.document.to_language_name}
                  status={this.state.document.status}
                  ownerName={this.state.document.owner_name}
                  submissionDate={this.state.document.submission_date}
                  dueDate={this.state.document.due_date}
                />
                {this.state.translation && (
                  <TranslationInfoBar
                    startTranslationDate={this.state.translation.start_date}
                    submitTranslationDate={
                      this.state.translation.submission_date
                    }
                    translatorName={this.state.translation.translator_name}
                  />
                )}
              </Table.Header>
            </Table>
            <DocumentTranslationContent
              document={this.state.document.content}
              translation={translationContent}
            />
          </Segment>
        )}
        <div>
          <Icon name="angle double left"></Icon>Back to
          <Link to={`/dashboard/`}>
            <span> Dashboard </span>
          </Link>{" "}
        </div>
      </Container>
    );
  }
}

export default ViewDocument;
