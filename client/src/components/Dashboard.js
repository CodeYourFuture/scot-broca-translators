import React, { Component } from "react";
import moment, { lang } from "moment";
import {
  Header,
  Container,
  Table,
  Button,
  Message,
  Label,
  Checkbox
} from "semantic-ui-react";
import { getDocuments, deleteDocumentById } from "../api/documents";
import { pickDocument, cancelTranslation } from "../api/translations";
import ActionColumn from "./ActionColumn";
import StatusColumn from "./StatusColumn";
import NameColumn from "./NameColumn";
import { sortDocuments } from "./helpers/sortDocuments";
import HeaderCell from "./HeaderCell";
import displayToastMessage from "./helpers/displayToastMessage";
import getGreeting from "./helpers/getGreeting";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      sortedHeaderCellIndex: null,
      sortKey: "",
      sorted: "",
      toggled: false
    };
  }

  componentDidMount() {
    this.setDocuments();
  }

  setDocuments = () => {
    getDocuments()
      .then(documents => {
        const { sorted, sortKey } = this.state;
        let docsToDisplay = sortDocuments(documents, "due_date");
        if (sorted === "desc") {
          docsToDisplay = sortDocuments(documents, sortKey);
        } else if (sorted === "acs") {
          docsToDisplay = sortDocuments(documents, sortKey).reverse();
        }
        this.setState({ documents: docsToDisplay });
      })
      .catch(err => console.log(err));
  };

  handlePickDocumentClick = id => {
    pickDocument(id)
      .then(response => {
        if (response.status === 200) {
          displayToastMessage(
            "success",
            "check",
            "You picked document successfully"
          );
          this.setDocuments();
        } else {
          throw response;
        }
      })
      .catch(error => {
        displayToastMessage("error", "cancel", "There is error");
        error.text().then(errorMessage =>
          this.setState({
            hasErrors: true,
            errorMessage: errorMessage
          })
        );
      });
  };

  handleDeleteDocumentClick = id => {
    deleteDocumentById(id)
      .then(response => {
        if (response.status === 200) {
          displayToastMessage(
            "success",
            "check",
            "You deleted document successfully"
          );
          this.setDocuments();
        } else {
          throw response;
        }
      })
      .catch(error => {
        displayToastMessage("error", "cancel", "There is an error");
        error.text().then(errorMessage =>
          this.setState({
            hasErrors: true,
            errorMessage: errorMessage
          })
        );
      });
  };

  handleCancelTranslationClick = id => {
    cancelTranslation(id)
      .then(response => {
        if (response.status === 200) {
          this.setDocuments();

          displayToastMessage(
            "success",
            "check",
            "Translation has been cancelled"
          );
        } else {
          throw response;
        }
      })
      .catch(error => {
        displayToastMessage("error", "cancel", "There is error");

        error.text().then(errorMessage =>
          this.setState({
            hasErrors: true,
            errorMessage: errorMessage
          })
        );
      });
  };

  handleHeaderCellClick = (id, sortKey) => {
    this.setState({ sortedHeaderCellIndex: id, sortKey: sortKey }, () => {
      const documentsToSort = this.state.documents;
      const sortedDocuments = sortDocuments(documentsToSort, sortKey);
      this.state.sorted === "desc"
        ? this.setState({
            documents: sortedDocuments.reverse(),
            sorted: "acs"
          })
        : this.setState({
            documents: sortedDocuments,
            sorted: "desc"
          });
    });
  };

  handleToggle = languages => {
    this.setState({ toggled: !this.state.toggled }, () => {
      if (!this.state.toggled) {
        this.setDocuments();
      } else {
        const filtereddDocs = this.state.documents.filter(document => {
          return (
            languages.includes(document.from_language_name) &&
            languages.includes(document.to_language_name)
          );
        });
        this.setState({ documents: filtereddDocs });
      }
    });
  };

  render() {
    const { documents, sorted, sortedHeaderCellIndex } = this.state;
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
    let languages = JSON.parse(sessionStorage.languages).map(
      language => language.language_name
    );

    const headerCells = [
      { header: "Document", sortKey: "name" },
      { header: "Due Date", sortKey: "due_date" },
      { header: "From Language", sortKey: "from_language_name" },
      { header: "To Language", sortKey: "to_language_name" },
      { header: "Status", sortKey: "status" }
    ];

    return (
      <Container>
        <Header style={{ marginTop: "25px" }} as="h2">
          Good {getGreeting()} {userName}!
        </Header>
        {userRole === "User" ? (
          <Button
            style={{ marginBottom: "1em" }}
            color="blue"
            onClick={() => this.props.history.push("/add-document")}
          >
            Add document
          </Button>
        ) : (
          <Checkbox
            toggle
            label="Only show documents I can translate"
            onClick={() => this.handleToggle(languages)}
          />
        )}
        {this.state.hasErrors ? (
          <Message negative>
            <Message.Header>An error occurred</Message.Header>
            <p>{this.state.errorMessage}</p>
          </Message>
        ) : null}
        <Table celled selectable striped>
          <Table.Header>
            <Table.Row>
              {headerCells.map((headerCell, index) => {
                let sortIconName = "sort";
                if (index === sortedHeaderCellIndex && sorted === "desc")
                  sortIconName = "sort down";
                if (index === sortedHeaderCellIndex && sorted === "acs")
                  sortIconName = "sort up";

                return (
                  <HeaderCell
                    key={index}
                    id={index}
                    headerCell={headerCell}
                    handleHeaderCellClick={this.handleHeaderCellClick}
                    sortIconName={sortIconName}
                  />
                );
              })}
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {documents &&
              documents.map(document => {
                const {
                  id,
                  name,
                  from_language_name,
                  to_language_name,
                  status,
                  translator_name,
                  translation_id,
                  due_date,
                  submission_date
                } = document;

                const dueDate = moment(due_date).format("DD/MM/YYYY");
                const submissionDate = moment(submission_date).format(
                  "DD/MM/YYYY"
                );
                const todayDate = moment(new Date()).format("DD/MM/YYYY");
                const label =
                  todayDate === submissionDate ? (
                    <Label ribbon color="blue" size="tiny">
                      New
                    </Label>
                  ) : null;
                return (
                  <Table.Row key={id}>
                    <NameColumn
                      label={label}
                      name={name}
                      userRole={userRole}
                      status={status}
                      dueDate={dueDate}
                    />
                    <Table.Cell>{dueDate}</Table.Cell>
                    <Table.Cell>{from_language_name}</Table.Cell>
                    <Table.Cell>{to_language_name}</Table.Cell>
                    <StatusColumn
                      status={status}
                      translatorName={translator_name}
                    />
                    <ActionColumn
                      translatorName={translator_name}
                      id={id}
                      status={status}
                      userName={userName}
                      userRole={userRole}
                      translationId={translation_id}
                      handlePickDocumentClick={this.handlePickDocumentClick}
                      handleCancelTranslationClick={
                        this.handleCancelTranslationClick
                      }
                      handleDeleteDocumentClick={this.handleDeleteDocumentClick}
                    />
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

export default Dashboard;
