const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createTranslation = ({ id, user_id, document_id, start_date }) => {
  const sqlQuery = `INSERT INTO translations (id, user_id,document_id, start_date)
  VALUES ($1,$2,$3,$4)`;
  return pool
    .query(sqlQuery, [id, user_id, document_id, start_date])
    .then(result => result.rows)
    .catch(error => console.error(error));
};

const getTranslationByDocumentId = documentId => {
  const sqlQuery = `select id from translations where translations.document_id = $1`;
  return pool
    .query(sqlQuery, [documentId])
    .then(result => result.rows)
    .catch(e => console.error(e));
};
module.exports = {
  createTranslation,
  getTranslationByDocumentId
};
