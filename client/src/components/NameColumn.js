import React from "react";
import { Table, Label } from "semantic-ui-react";
import moment from "moment";

function getOverDueLabel(dueDate) {
  const currentDate = new Date();
  const todayDate = moment(currentDate).format("L");
  const threeDaysLeft = moment(currentDate)
    .add(3, "days")
    .format("L");
  const twoDaysLeft = moment(currentDate)
    .add(2, "days")
    .format("L");
  const oneDayLeft = moment(currentDate)
    .add(1, "days")
    .format("L");

  if (dueDate < todayDate) {
    return (
      <Label size="small" color="red" style={{ float: "right" }}>
        Overdue
      </Label>
    );
  } else if (dueDate === oneDayLeft) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 1 day
      </Label>
    );
  } else if (dueDate === twoDaysLeft) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 2 days
      </Label>
    );
  } else if (dueDate === threeDaysLeft) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 3 days
      </Label>
    );
  } else if (dueDate === todayDate) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due today
      </Label>
    );
  } else {
    return null;
  }
}

const NameColumn = props => {
  const { status, dueDate, name, userRole, label } = props;
  return (
    <Table.Cell>
      {label}
      {name}
      {userRole === "Interpreter" && status !== "Completed"
        ? getOverDueLabel(dueDate)
        : null}
    </Table.Cell>
  );
};
export default NameColumn;
