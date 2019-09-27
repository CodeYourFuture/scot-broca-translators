import React from "react";
import { Table, Icon } from "semantic-ui-react";

function HeaderCell({ handleHeaderCellClick, headerCell, id, sortIconName }) {
  const { header, sortKey } = headerCell;
  return (
    <Table.HeaderCell
      onClick={() => handleHeaderCellClick(id, sortKey)}
      id={id}
    >
      <Icon fitted name={sortIconName} /> {header}
    </Table.HeaderCell>
  );
}

export default HeaderCell;
