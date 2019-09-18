import React from "react";
import { Table } from "semantic-ui-react";

const StatusColumn = props => {
  const { status, translatorName } = props;
  return status !== "Waiting" ? (
    <Table.Cell>
      {status} by {translatorName}
    </Table.Cell>
  ) : (
    <Table.Cell>{status}</Table.Cell>
  );
};

export default StatusColumn;
