import React, { Component } from "react";
import moment from "moment";
import { Header, Container, Table, Button, Message } from "semantic-ui-react";
import { getDocuments } from "../api/documents";
import { pickDocument } from "../api/translations";
import ActionColumn from "./ActionColumn";
import StatusColumn from "./StatusColumn";
import { sortDocuments } from "./helpers/sortDocuments";
import SortableHeaderCell from "./SortableHeaderCell";
import HeaderCell from "./HeaderCell";

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
        let docsToDisplay = sortDocuments(documents, "due_date");
        if (this.state.sorted === "desc") {
          docsToDisplay = sortDocuments(documents, this.state.sortKey);
        } else if (this.state.sorted === "acs") {
          docsToDisplay = sortDocuments(
            documents,
            this.state.sortKey
          ).reverse();
        }
        this.setState({ documents: docsToDisplay });
      })
      .catch(err => console.log(err));
  };

  handlePickDocumentClick = id => {
    pickDocument(id)
      .then(response => {
        if (response.status === 200) {
          this.setDocuments();
        } else {
          throw response;
        }
      })
      .catch(error => {
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
      this.setState({
        documents: sortedDocuments,
        sorted: "desc"
      });
    });
  };

  sortOnClick = (sortKey, isSorted) => {
    const documentsToSort = this.state.documents;
    const sortedDocuments = sortDocuments(documentsToSort, sortKey);
    isSorted
      ? this.setState({
          documents: sortedDocuments,
          sorted: "desc"
        })
      : this.setState({
          documents: sortedDocuments.reverse(),
          sorted: "acs"
        });
  };

  render() {
    const { documents } = this.state;
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
        <Table celled unstackable selectable striped>
          <Table.Header>
            <Table.Row>
              {headerCells.map((headerCell, index) => {
                if (index !== this.state.sortedHeaderCellIndex) {
                  return (
                    <HeaderCell
                      key={index}
                      id={index}
                      headerCell={headerCell}
                      handleHeaderCellClick={this.handleHeaderCellClick}
                    />
                  );
                } else {
                  return (
                    <SortableHeaderCell
                      key={index}
                      headerCell={headerCell}
                      sortOnClick={this.sortOnClick}
                    />
                  );
                }
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
                  translator_name
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
                      handlePickDocumentClick={this.handlePickDocumentClick}
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
