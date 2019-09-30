const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const query = `select
  d.id, d.format, d.name,
  d.status, d.submission_date, d.due_date,
  lf.name as from_language_name,
  lt.name as to_language_name,
  u.name as owner_name,
  t.start_date, u2.name as translator_name,
  t.id as translation_id
from documents as d
inner join languages as lf
  on  lf.code = d.from_language_code
inner join languages as lt
  on lt.code = d.to_language_code
inner join users as u
  on u.id = d.owner_id
left join translations t
  on t.document_id = d.id
left join users u2
  on u2.id = t.user_id`;

const createDocument = ({
  from_language_code,
  to_language_code,
  submission_date,
  due_date,
  owner_id,
  name,
  format,
  content
}) => {
  const sqlQuery =
    "INSERT INTO documents (from_language_code,to_language_code,submission_date,due_date,owner_id,name,format,content) values ($1, $2,$3,$4,$5,$6,$7,$8)";

  return pool
    .query(sqlQuery, [
      from_language_code,
      to_language_code,
      submission_date,
      due_date,
      owner_id,
      name,
      format,
      content
    ])
    .then(result => result.rows);
};

const getAllDocuments = () => {
  const sqlQuery = query + ";";
  return pool
    .query(sqlQuery)
    .then(result => result.rows)
    .catch(e => console.error(e));
};

const getUserDocuments = userId => {
  const sqlQuery = query + " where d.owner_id=$1;";

  return pool
    .query(sqlQuery, [userId])
    .then(result => result.rows)
    .catch(e => console.error(e));
};

const getDocumentById = documentId => {
  const sqlQuery = `select
   d.name, d.id as document_id,
   d.status, d.submission_date, d.due_date,
   lf.name as from_language_name,
   lt.name as to_language_name,
   u.name as owner_name,
   d.content, t.id as translation_id
 from documents as d
 inner join languages as lf
   on  lf.code = d.from_language_code
 inner join languages as lt
   on lt.code = d.to_language_code
 inner join users as u
   on u.id = d.owner_id
left join translations t
    on t.document_id = d.id
 where d.id = $1`;
  return pool
    .query(sqlQuery, [documentId])
    .then(result => result.rows)
    .catch(e => console.error(e));
};

const updateDocumentStatusById = (status, documentId) => {
  const sqlQuery = `update documents SET status = $1 WHERE documents.id =$2`;
  return pool.query(sqlQuery, [status, documentId]).then(result => result.rows);
};

const checkDocumentId = documentId => {
  const sqlQuery = `select id from documents where documents.id = $1`;
  return pool
    .query(sqlQuery, [documentId])
    .then(result => result.rows)
    .catch(error => console.error(error));
};

const getDocumentIdByTranslationId = translationId => {
  const query = "select document_id from translations where id =$1";
  return pool
    .query(query, [translationId])
    .then(result => result.rows[0].document_id);
};

const deleteDocument = documentId => {
  const query = "DELETE FROM documents WHERE id =$1";
  return pool
    .query(query, [documentId])
    .then(result => result.rows);
};

const checkUserIdFromDocument = userId => {
  const query = "select owner_id from documents where id=$1";
  return pool.query(query, [userId]).then(result => {
    return result.rows[0].owner_id;
  });
};

const checkDocumentStatus = documentId => {
  const query = "select status from documents where id=$1";
  return pool.query(query, [documentId]).then(result => result.rows[0].status);
};
module.exports = {
  getAllDocuments,
  createDocument,
  getUserDocuments,
  getDocumentById,
  updateDocumentStatusById,
  getDocumentIdByTranslationId,
  checkDocumentId,
  checkDocumentStatus,
  checkUserIdFromDocument,
  deleteDocument
};
