import React from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const View = props => {
  let { id } = props;
  return (
    <Button compact>
      <Link to={`/document/${id}`}>
        <i aria-hidden="true" class="file text icon"></i> View
      </Link>
    </Button>
  );
};

const ActionColumn = props => {
  const {
    id,
    status,
    translatorName,
    userName,
    userRole,
    translationId
  } = props;

  if (userRole === "User") {
    return (
      <Table.Cell>
        <View id={id} />
      </Table.Cell>
    );
  } else if (userName === translatorName && status === "Processing") {
    return (
      <Table.Cell>
        <View id={id} />
        <Link to={`/add-document-translation/${id}`}>
          <Button compact>
            <i aria-hidden="true" class="send small icon"></i>Submit Translation
          </Button>
        </Link>
        <Button
          className="ui red compact button"
          onClick={() => props.handleCancelTranslationClick(translationId)}
        >
          <i aria-hidden="true" class="delete icon"></i>
          Cancel
        </Button>
      </Table.Cell>
    );
  } else {
    return (
      <Table.Cell>
        <View id={id} />
        {status === "Waiting" ? (
          <Button compact onClick={() => props.handlePickDocumentClick(id)}>
            <i aria-hidden="true" class="plus square small icon"></i> Pick
            Document
          </Button>
        ) : null}
      </Table.Cell>
    );
  }
};

export default ActionColumn;
