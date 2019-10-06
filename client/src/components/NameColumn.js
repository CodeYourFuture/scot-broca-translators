import React from "react";
import { Table, Label } from "semantic-ui-react";
import moment from "moment";

function getOverDueLabel(dueDate) {
  const todayDate = moment();
  const duration = dueDate.diff(todayDate, "hours");

  if (duration < -24) {
    return (
      <Label size="small" color="red" style={{ float: "right" }}>
        Overdue
      </Label>
    );
  } else if (duration < 0) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due today
      </Label>
    );
  } else if (duration <= 24) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 1 day
      </Label>
    );
  } else if (duration <= 48) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 2 days
      </Label>
    );
  } else if (duration <= 72) {
    return (
      <Label size="small" color="yellow" style={{ float: "right" }}>
        Due in 3 days
      </Label>
    );
  } else {
    return null;
  }
}

const NameColumn = props => {
  const { status, name, userRole, label, dueDate } = props;
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
