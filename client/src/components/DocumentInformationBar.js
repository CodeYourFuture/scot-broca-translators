import React from "react";
import { parseDate } from "./helpers/parseDate";
import { Table } from "semantic-ui-react";

const DocumentInformationBar = document => {
  const requestedDate = parseDate(document.submission_date);
  const dueDate = parseDate(document.due_date);
  return (
    <Table celled inverted>
      <Table.Body>
        <Table.Row>
          <Table.Cell textAlign="center">
            Requested date: {requestedDate}
          </Table.Cell>
          <Table.Cell textAlign="center">Due date: {dueDate}</Table.Cell>
          <Table.Cell textAlign="center">
            From {document.from_language_name} to {document.to_language_name}
          </Table.Cell>
          <Table.Cell textAlign="center">Status: {document.status}</Table.Cell>
          <Table.Cell textAlign="center">
            Submitted by {document.owner_name}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
export default DocumentInformationBar;
