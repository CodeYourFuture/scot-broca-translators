import React from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const View = props => {
  let { id } = props;
  return (
    <span>
      <Link to={`/document/${id}`}>View</Link>
    </span>
  );
};

const ActionColumn = props => {
  const { id, status, translatorName, userName, userRole } = props;

  if (userRole === "User") {
    return (
      <Table.Cell>
        <View id={id} />
      </Table.Cell>
    );
  } else if (userName === translatorName && status === "Processing") {
    return (
      <Table.Cell>
        <View id={id} />/
        <Link to={`/add-document-translation/${id}`}>
          <span>Submit Translation</span>
        </Link>
        /
        <Button onClick={() => props.handleCancelTranslationClick(id)}>
          Cancel
        </Button>
      </Table.Cell>
    );
  } else {
    return (
      <Table.Cell>
        <View id={id} />
        {status === "Waiting" ? (
          <Button onClick={() => props.handlePickDocumentClick(id)}>
            Pick Document
          </Button>
        ) : null}
      </Table.Cell>
    );
  }
};

export default ActionColumn;
