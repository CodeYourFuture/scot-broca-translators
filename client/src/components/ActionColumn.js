import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ActionColumn = props => {
  const { id, status, translatorName, userName, userRole } = props;
  if (userRole === "User") {
    return (
      <Table.Cell>
        <span>View</span> / <span>Delete</span>
      </Table.Cell>
    );
  } else if (userName === translatorName && status === "Processing") {
    return (
      <Table.Cell>
        <span>View</span> /{" "}
        <Link to={`/add-document-translation/${id}`}>
          <span>Submit Translation</span>
        </Link>
      </Table.Cell>
    );
  } else {
    return (
      <Table.Cell>
        <span>View</span> / <span>Pick Translation</span>
      </Table.Cell>
    );
  }
};

export default ActionColumn;
