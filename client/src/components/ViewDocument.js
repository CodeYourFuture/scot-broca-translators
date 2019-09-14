import React, { Component } from "react";

import { Header, Container, Table } from "semantic-ui-react";

export class ViewDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: "",
      documentName: "",
      submissionDate: "",
      dueDate: "",
      fromLanguageName: "",
      toLanguageName: "",
      status: "",
      ownerName: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://localhost:4000/api/documents/${id}`, {
      method: "get",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          document: data[0].content,
          documentName: data[0].name,
          submissionDate: data[0].submission_date,
          dueDate: data[0].due_date,
          fromLanguageName: data[0].from_language_name,
          toLanguageName: data[0].to_language_name,
          status: data[0].status,
          ownerName: data[0].owner_name
        });
      });
  }
  render() {
    const {
      document,
      documentName,
      submissionDate,
      dueDate,
      fromLanguageName,
      toLanguageName,
      status,
      ownerName
    } = this.state;
    return (
      <Container>
        <Header as="h2"> {documentName}</Header>
        <Table celled unstackable selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {" "}
                Submission Date {submissionDate}
              </Table.HeaderCell>
              <Table.HeaderCell>Due Date {dueDate}</Table.HeaderCell>
              <Table.HeaderCell>
                {" "}
                From {fromLanguageName} To {toLanguageName}
              </Table.HeaderCell>
              <Table.HeaderCell>Status:{status}</Table.HeaderCell>
              <Table.HeaderCell>Submitted By {ownerName}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <p>{document}</p>
      </Container>
    );
  }
}

export default ViewDocument;
