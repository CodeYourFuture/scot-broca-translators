const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

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
  const sqlQuery = `select\
  d.id, d.format, d.name,\
    d.status, d.submission_date, d.due_date,\
    lf.name as from_language_name,\
    lt.name as to_language_name,\
    u.name as owner_name,\
    trnsl.start_date, trnsl.translator_name\
  from documents as d\
  inner join languages as lf\
  on  lf.code = d.from_language_code\
  inner join languages as lt\
  on lt.code = d.to_language_code\
  inner join users as u\
  on u.id = d.owner_id\
  left join(\
    select\
           t.document_id,\
    t.start_date,\
    tu.name as translator_name\
    from translations as t\
    inner join users as tu\
        on tu.id = t.user_id\
  ) trnsl on trnsl.document_id = d.id\
    ;`;
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
  getUserDocuments,
  getDocumentById
};
