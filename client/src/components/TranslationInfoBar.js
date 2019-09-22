import React from "react";
import { Header, Container, Table, Segment } from "semantic-ui-react";
import { parseDate } from "./helpers/parseDate";

const TranslationInfoBar = ({
  startTranslationDate,
  submitTranslationDate
}) => {
  const parsSubmitTranslationDate = parseDate(submitTranslationDate);
  const parsStartTranslationDate = parseDate(startTranslationDate);
  return (
    <Table.Row>
      <Table.HeaderCell textAlign="center">
        Translation started on {parsStartTranslationDate} and submitted on{" "}
        {parsSubmitTranslationDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center">
        Translation done by
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default TranslationInfoBar;
