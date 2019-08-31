const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

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
          console.log(result);
          resolve(result.rows);
        }
      }
    );
  });
};

const getAllDocuments = () => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
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
      on u.id = d.owner_id;";

    pool.query(sqlQuery, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getUserDocuments = userId => {
  const documents = "SELECT * FROM documents WHERE owner_id=$1";
  return new Promise((resolve, reject) => {
    pool.query(documents, [userId], (error, result) => {
      if (error) {
        reject(error);
      }

      resolve(result.rows);
    });
  });
};

module.exports = {
  getAllDocuments,
api-endpoint
  createDocument

  getUserDocuments
 master
};
