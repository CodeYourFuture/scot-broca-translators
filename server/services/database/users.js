const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

/**
 * This is used for testing the Client<->API connection, but this operation
 * won't be allowed in the final version of the project as it is a
 * security risk to expose all users
 */
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT id, email FROM users", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const getUserByEmail = email => {
  return new Promise(resolve => {
    pool.query(
      "SELECT * FROM users where email = $1",
      [email],
      (error, result) => {
        resolve(result.rows[0]);
      }
    );
  });
};

const getUserIdByEmail = email => {
  return new Promise(resolve => {
    pool.query(
      "SELECT id FROM users where email = $1",
      [email],
      (error, result) => {
        resolve(result.rows[0]);
      }
    );
  });
};

const createUser = ({ email, password, name, role, languages }) => {
  return getUserByEmail(email)
    .then(users => {
      return new Promise((resolve, reject) => {
        if (users) {
          reject("An account with the same email address already exists");
        } else {
          resolve();
        }
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        pool.query(
          "INSERT INTO users (email, password,name,role) values ($1, $2,$3,$4)",
          [email, password, name, role],
          (error, result) => {
            if (error) {
              console.log(error);
              reject("An unexpected error occured, please try again later.");
            }
            resolve(result.rows);
          }
        );
      })
        .then(() => getUserIdByEmail(email))
        .then(id => submitUserLanguages(id.id, languages));
    });
};

const submitUserLanguages = (id, languages) => {
  const values = languages
    .map((language, index) => `($1,$${2 + index})`)
    .join(", ");
  const sqlQuery = `INSERT INTO users_languages (user_id, language_code) VALUES ${values}`;

  return pool
    .query(sqlQuery, [id, ...languages])
    .then(result => result.rows)
    .catch(error => console.error(error));
};

const getUserById = id => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users where id = $1", [id], (error, result) => {
      if (error) {
        console.error(error);
        return reject(error);
      }
      resolve(result.rows[0]);
    });
  });
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers
};
