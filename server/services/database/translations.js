const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createTranslation = ({ user_id, document_id, start_date }) => {
  const sqlQuery = `INSERT INTO translations (user_id, document_id, start_date)
  VALUES ($1,$2,$3)`;
  return pool
    .query(sqlQuery, [user_id, document_id, start_date])
    .then(result => result.rows)
    .catch(error => console.error(error));
};

const getTranslationByDocumentId = documentId => {
  const sqlQuery = `select id from translations where translations.document_id = $1`;
  return pool.query(sqlQuery, [documentId]).then(result => result.rows);
};

const updateTranslation = (content, translationId, userId) => {
  const query = `UPDATE translations SET submission_date=NOW(), content=$1 WHERE id=$2 and user_id = $3 RETURNING id`;

  return pool
    .query(query, [content, translationId, userId])
    .then(result => result.rows);
};

const deleteTranslation = translationId => {
  console.log("translationId" + translationId);
  const query = "DELETE from translations WHERE id=$1";
  return pool.query(query, [translationId]).then(result => result.rows);
};

const getUserIdByTranslationId = translationId => {
  const query = "select user_id from translations where id=$1";
  return pool
    .query(query, [translationId])
    .then(result => {
      result.rows[0].user_id;
      console.log(
        " this is user trans id from the database" + result.rows[0].user_id
      );
    })
    .catch(error => console.error(error));
};
module.exports = {
  createTranslation,
  getTranslationByDocumentId,
  updateTranslation,
  deleteTranslation,
  getUserIdByTranslationId
};
