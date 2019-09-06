import React, { Component } from "react";
import moment from "moment";
import { Header, Container, Table, Button } from "semantic-ui-react";
import { getDocuments } from "../api/documents";
import { Link } from "react-router-dom";

function actionColumn(id, userName, translator_name, status, goToSubmitPage) {
  if (userName === translator_name && status === "Processing") {
    return (
      <Link to={"/add-document-translation/" + id}>
        <span>Submit Translation</span>
      </Link>
    );
  } else {
    return <span>Pick Translation</span>;
  }
}

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    getDocuments()
      .then(documents => this.setState({ documents }))
      .catch(err => console.log(err));
  }

  render() {
    const { documents } = this.state;
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
    // const actionColumn =
    //   userName === name ? null : <span>Pick Translation</span>;
    return (
      <Container>
        <Header as="h2">Hello {userName}!</Header>
        {userRole === "User" ? (
          <Button onClick={() => this.props.history.push("/add-document")}>
            {" "}
            Add document
          </Button>
        ) : null}
        <Table celled unstackable selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Document</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>From Language</Table.HeaderCell>
              <Table.HeaderCell>To Language</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
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
                    {status !== "Waiting" ? (
                      <Table.Cell>
                        {status} by {translator_name}
                      </Table.Cell>
                    ) : (
                      <Table.Cell>{status}</Table.Cell>
                    )}
                    <Table.Cell>
                      <span>View</span> \
                      {userRole === "User" ? (
                        <span>Delete</span>
                      ) : (
                        actionColumn(
                          id,
                          userName,
                          translator_name,
                          status,
                          this.goToSubmitPage
                        )
                      )}
                    </Table.Cell>
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
