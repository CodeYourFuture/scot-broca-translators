import React, { Component } from "react";
import moment from "moment";
import { Header, Container, Table, Button, Message } from "semantic-ui-react";
import { getDocuments } from "../api/documents";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: []
    };
  }

  componentDidMount() {
    this.setDocuments();
  }

  setDocuments() {
    getDocuments()
      .then(documents => this.setState({ documents }))
      .catch(err => console.log(err));
  }
  handleErrors(response) {
    return response.json().then(json => {
      if (!response.ok) {
        throw json.message;
      } else {
        return json;
      }
    });
  }

  pickDocument(id) {
    const userRequest = {
      method: "POST",
      body: JSON.stringify({
        document_id: id
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    };

    fetch("http://localhost:4000/api/translations", userRequest)
      .then(data => {
        if (data.status === 200) {
          this.setDocuments();
        } else {
          return this.handleErrors;
        }
      })
      .catch(error => {
        this.setState({
          hasErrors: true,
          errorMessage: error
        });
      });
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
        {this.state.hasErrors ? (
          <Message negative>
            <Message.Header>An error occurred</Message.Header>
            <p>{this.state.errorMessage}</p>
          </Message>
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
                      <Button>View</Button>
                      {userRole === "User" ? <Button>Delete</Button> : null}
                      {userRole === "Interpreter" && status === "Waiting" ? (
                        <Button onClick={() => this.pickDocument(id)}>
                          Pick Document
                        </Button>
                      ) : null}
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
