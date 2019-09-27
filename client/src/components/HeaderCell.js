import React from "react";
import { Table, Icon } from "semantic-ui-react";

function HeaderCell({ handleHeaderCellClick, headerCell, id }) {
  const { header, sortKey } = headerCell;
  return (
    <Table.HeaderCell
      onClick={() => handleHeaderCellClick(id, sortKey)}
      id={id}
    >
      <Icon fitted name="sort" /> {header}
    </Table.HeaderCell>
  );
}

export default HeaderCell;
