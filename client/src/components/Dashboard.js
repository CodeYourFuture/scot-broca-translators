import React, { Component } from "react";
import moment from "moment";
import { Header, Container, Table, Button, Message } from "semantic-ui-react";
import { getDocuments } from "../api/documents";
import { pickDocument, cancelTranslation } from "../api/translations";
import ActionColumn from "./ActionColumn";
import StatusColumn from "./StatusColumn";
import { sortDocuments } from "./helpers/sortDocuments";
import HeaderCell from "./HeaderCell";
import displayToastMessage from "./helpers/displayToastMessage";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      sortedHeaderCellIndex: null,
      sortKey: "",
      sorted: ""
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

  handleCancelTranslationClick = id => {
    cancelTranslation(id)
      .then(response => {
        if (response.status === 200) {
          this.setDocuments();

          displayToastMessage(
            "success",
            "check",
            "You picked document successfully"
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

  render() {
    const { documents, sorted, sortedHeaderCellIndex } = this.state;
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
    const headerCells = [
      { header: "Document", sortKey: "name" },
      { header: "Due Date", sortKey: "due_date" },
      { header: "From Language", sortKey: "from_language_name" },
      { header: "To Language", sortKey: "to_language_name" },
      { header: "Status", sortKey: "status" }
    ];

    return (
      <Container>
        <Header as="h2">Hello {userName}!</Header>
        {userRole === "User" ? (
          <Button onClick={() => this.props.history.push("/add-document")}>
            Add document
          </Button>
        ) : null}
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
                  translation_id
                } = document;
                const dueDate = moment(document.due_date).format("L");
                return (
                  <Table.Row key={id}>
                    <Table.Cell>{name}</Table.Cell>
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
