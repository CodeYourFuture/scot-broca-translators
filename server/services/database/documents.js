const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const createDocument = ({ uid, userSignUp, interpreterSignUp }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO documents (uid,userSignUp,intepreterSignUp) values ($1, $2,$3)",
      [uid, userSignUp, interpreterSignUp],
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
