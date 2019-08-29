import React, { Component } from "react";
import { Header, Container, Table, Button } from "semantic-ui-react";
import { getDocuments } from "../api/documents";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    getDocuments()
      .then(documents => this.setState({ documents }))
      .catch(err => console.log(err));
  }

  render() {
    const { documents } = this.state;
    const userName = sessionStorage.getItem("userName");
    const userRole = sessionStorage.getItem("userRole");
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
                return (
                  <Table.Row key={document.id}>
                    {console.log(document)}
                    <Table.Cell>{document.name}</Table.Cell>
                    <Table.Cell>{document.due_date}</Table.Cell>
                    <Table.Cell>{document.from_language_name}</Table.Cell>
                    <Table.Cell>{document.to_language_name}</Table.Cell>
                    <Table.Cell>{document.status}</Table.Cell>
                    <Table.Cell>No</Table.Cell>
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
