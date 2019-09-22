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
      <Table.HeaderCell textAlign="center" colSpan="1">
        Requested date: {parsedSubmissionDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center" colSpan="1">
        Due date: {parsedDueDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center" colSpan="1">
        From {fromLanguageName} to {toLanguageName}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center" colSpan="1">
        Status: {status}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center" colSpan="1">
        Submitted by {ownerName}
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default DocumentInformationBar;
