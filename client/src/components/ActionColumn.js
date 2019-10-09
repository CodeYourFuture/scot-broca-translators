import React from "react";
import { Table, Button, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

const View = props => {
  let { id } = props;
  return (
    <Popup
      content="View"
      trigger={
        <Button as={Link} to={`/document/${id}`} compact icon="file text" />
      }
    />
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
        {status === "Waiting" ? (
          <Popup
            content="Delete document"
            trigger={
              <Button
                compact
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this document?"
                    )
                  )
                    props.handleDeleteDocumentClick(id);
                }}
                icon="trash"
              />
            }
          />
        ) : null}
      </Table.Cell>
    );
  } else if (userName === translatorName && status === "Processing") {
    return (
      <Table.Cell>
        <View id={id} />
        <Popup
          content="Submit Translation"
          trigger={
            <Button
              as={Link}
              to={`/add-document-translation/${id}`}
              compact
              icon="send"
            />
          }
        />
        <Popup
          content="Cancel Translation"
          trigger={
            <Button
              compact
              onClick={() => props.handleCancelTranslationClick(translationId)}
              icon="delete"
            />
          }
        />
      </Table.Cell>
    );
  } else {
    return (
      <Table.Cell>
        <View id={id} />
        {status === "Waiting" ? (
          <Popup
            content="Pick Document"
            trigger={
              <Button
                compact
                onClick={() => props.handlePickDocumentClick(id)}
                icon="add"
              />
            }
          />
        ) : null}
      </Table.Cell>
    );
  }
};

export default ActionColumn;
