import React from "react";
import { Table, Label } from "semantic-ui-react";

const NameColumn = props => {
  const {
    status,
    dueDate,
    name,
    dateOnly,
    oneDayLeft,
    twoDaysLeft,
    threeDaysLeft
  } = props;

  if (status === "Waiting" && dueDate < dateOnly) {
    return (
      <Table.Cell>
        {name} <Label color="red">Overdue</Label>
      </Table.Cell>
    );
  } else if (dueDate === oneDayLeft) {
    return (
      <Table.Cell>
        {name} <Label color="red">Due in 1 day</Label>
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === twoDaysLeft) {
    return (
      <Table.Cell>
        {name} <Label color="red">Due in 2 days </Label>
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === threeDaysLeft) {
    return (
      <Table.Cell>
        {name} <Label color="red">Due in 3 days</Label>
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === dateOnly) {
    return (
      <Table.Cell>
        {name} <Label color="red">Due today</Label>
      </Table.Cell>
    );
  } else {
    return <Table.Cell>{name}</Table.Cell>;
  }
};

export default NameColumn;
