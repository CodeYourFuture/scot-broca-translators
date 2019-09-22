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
  const fieldsContent = [
    `Requested date: ${parsedSubmissionDate}`,
    `Due date: ${parsedDueDate}`,
    `From ${fromLanguageName} to ${toLanguageName}`,
    `Status: ${status}`,
    `Submitted by ${ownerName}`
  ];

  return (
    <Table.Row>
      {fieldsContent.map((fieldContent, index) => {
        return (
          <Table.HeaderCell textAlign="center" colSpan="1" key={index}>
            {fieldContent}
          </Table.HeaderCell>
        );
      })}
    </Table.Row>
  );
};

export default DocumentInformationBar;
