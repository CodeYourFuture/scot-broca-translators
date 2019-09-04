const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createTranslation = ({ id, user_id, document_id, start_date }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO translations (id, user_id,document_id,start_date) values ($1, $2,$3,$4)",
      [id, user_id, document_id, start_date],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      }
    );
  });
};

const getTranslationByDocumentId = documentId => {
  const sqlQuery = `select id from translations where translations.document_id = $1`;
  return pool
    .query(sqlQuery, [documentId])
    .then(result => result.rows)
    .catch(e => console.error(e));
};
module.export = {
  createTranslation,
  getTranslationByDocumentId
};
