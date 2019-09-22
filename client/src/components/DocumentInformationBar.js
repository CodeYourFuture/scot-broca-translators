import React from "react";
import { parseDate } from "./helpers/parseDate";
import { Table } from "semantic-ui-react";

const DocumentInformationBar = ({
  fromLanguageName,
  toLanguageName,
  status,
  ownerName,
  submissionDate,
  dueDate
}) => {
  const parsedSubmissionDate = parseDate(submissionDate);
  const parsedDueDate = parseDate(dueDate);

  return (
    <Table.Row>
      <Table.HeaderCell textAlign="center">
        Requested date: {parsedSubmissionDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">
        Due date: {parsedDueDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">
        From {fromLanguageName} to {toLanguageName}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">Status: {status}</Table.HeaderCell>
      <Table.HeaderCell textAlign="center">
        Submitted by {ownerName}
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default DocumentInformationBar;
