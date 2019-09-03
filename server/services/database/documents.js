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
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO documents (from_language_code,to_language_code,submission_date,due_date,owner_id,name,format,content) values ($1, $2,$3,$4,$5,$6,$7,$8)",
      [
        from_language_code,
        to_language_code,
        submission_date,
        due_date,
        owner_id,
        name,
        format,
        content
      ],
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
const query =
  "select\
          d.id, d.format, d.name,\
          d.status, d.submission_date, d.due_date,\
          lf.name as from_language_name,\
          lt.name as to_language_name,\
          u.name as owner_name\
      from documents as d\
      inner join languages as lf\
      on  lf.code = d.from_language_code\
      inner join languages as lt\
      on lt.code = d.to_language_code\
      inner join users as u\
      on u.id = d.owner_id";

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
 d.name,
   d.status, d.submission_date, d.due_date,
   lf.name as from_language_name,
   lt.name as to_language_name,
   u.name as owner_name,
   d.content
 from documents as d
 inner join languages as lf
 on  lf.code = d.from_language_code
 inner join languages as lt
 on lt.code = d.to_language_code
 inner join users as u
 on u.id = d.owner_id
 where d.id = $1`;
  return pool
    .query(sqlQuery, [documentId])
    .then(result => result.rows)
    .catch(e => console.error(e));
};

module.exports = {
  getAllDocuments,
  createDocument,
  getUserDocuments,
  getDocumentById,
  createTranslation
};
