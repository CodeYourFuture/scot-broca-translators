import React from "react";
import { parseDate } from "./helpers/parseDate";
import { Table } from "semantic-ui-react";
import moment from "moment";

const DocumentInformationBar = ({
  fromLanguageName,
  toLanguageName,
  status,
  ownerName,
  submissionDate,
  dueDate
}) => {
  const parsedSubmissionDate = moment(submissionDate).format("DD/MM/YYYY");
  const parsedDueDate = moment(dueDate).format("DD/MM/YYYY");
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
