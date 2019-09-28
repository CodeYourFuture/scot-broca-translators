import React from "react";
import { Table, Button, Icon, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

const View = props => {
  let { id } = props;
  return (
    <Popup
      content="View"
      trigger={
        <Button
          as={Link}
          to={`/document/${id}`}
          compact
          icon="file text icon"
        />
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
              icon="send icon"
            />
          }
        />
        <Popup
          content="Cancel Translation"
          trigger={
            <Button
              compact
              onClick={() => props.handleCancelTranslationClick(translationId)}
              icon="delete icon"
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
                icon="add icon"
              />
            }
          />
        ) : null}
      </Table.Cell>
    );
  }
};

export default ActionColumn;
