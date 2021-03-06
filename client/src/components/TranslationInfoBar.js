import React from "react";
import { Table } from "semantic-ui-react";
import { parseDate } from "./helpers/parseDate";

const TranslationInfoBar = ({
  startTranslationDate,
  submitTranslationDate,
  translatorName
}) => {
  const parsSubmitTranslationDate = parseDate(submitTranslationDate);
  const parsStartTranslationDate = parseDate(startTranslationDate);

  return (
    <Table.Row>
      <Table.HeaderCell textAlign="center" colSpan="3">
        Translation started on {parsStartTranslationDate} and submitted on {parsSubmitTranslationDate}
      </Table.HeaderCell>
      <Table.HeaderCell textAlign="center" colSpan="2">
        Translation done by {translatorName}
      </Table.HeaderCell>
    </Table.Row>
  );
};

export default TranslationInfoBar;
