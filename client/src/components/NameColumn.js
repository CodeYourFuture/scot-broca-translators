import React from "react";
import { Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

const NameColumn = props => {
  const { status, userRole, dueDate, name } = props;

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

  if (status === "Waiting" && dueDate < todayDate) {
    return (
      <Table.Cell>
        {name}
        {userRole === "User" ? (
          <Label
            basic
            color="red"
            as={Link}
            to="add-document"
            style={{ float: "right" }}
          >
            Re-sumbit the document again please!
          </Label>
        ) : (
          <Label color="red" style={{ float: "right" }}>
            Overdue
          </Label>
        )}
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === oneDayLeft) {
    return (
      <Table.Cell>
        {name}
        {userRole === "Interpreter" ? (
          <Label color="red" style={{ float: "right" }}>
            Due in 1 day
          </Label>
        ) : null}
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === twoDaysLeft) {
    return (
      <Table.Cell>
        {name}
        {userRole === "Interpreter" ? (
          <Label color="red" style={{ float: "right" }}>
            Due in 2 days
          </Label>
        ) : null}
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === threeDaysLeft) {
    return (
      <Table.Cell>
        {name}
        {userRole === "Interpreter" ? (
          <Label color="red" style={{ float: "right" }}>
            Due in 3 days
          </Label>
        ) : null}
      </Table.Cell>
    );
  } else if (status === "Waiting" && dueDate === todayDate) {
    return (
      <Table.Cell>
        {name}
        {userRole === "Interpreter" ? (
          <Label color="red" style={{ float: "right" }}>
            Due today
          </Label>
        ) : null}
      </Table.Cell>
    );
  } else {
    return <Table.Cell>{name}</Table.Cell>;
  }
};

export default NameColumn;
