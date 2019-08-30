const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createDocument = ({
  from_language_code,
  to_language_code,
  status,
  submission_date,
  due_date,
  owner_id,
  format
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO documents (from_language_code,to_language_code,status,submission_date,due_date,owner_id,format) values ($1, $2,$3,$4,$5,$6,$7)",
      [
        from_language_code,
        to_language_code,
        status,
        submission_date,
        due_date,
        owner_id,
        format
      ],
      (error, result) => {
        if (error) {
          reject(error);
        }
        console.log(result);
        resolve(result.rows);
      }
    );
  });
};
module.exports = {
  createDocument
};
