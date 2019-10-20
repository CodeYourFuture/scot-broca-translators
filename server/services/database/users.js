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
    .then(async () => {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const queryText =
          "INSERT INTO users (email, password,name,role) values ($1, $2,$3,$4) RETURNING id";

        const res = await client.query(queryText, [
          email,
          password,
          name,
          role
        ]);
        if (role !== "User") {
          const id = res.rows[0].id;
          const values = languages
            .map((language, index) => `($1,$${2 + index})`)
            .join(", ");
          const sqlQuery = `INSERT INTO users_languages (user_id, language_code) VALUES ${values}`;
          await client.query(sqlQuery, [id, ...languages]);
        }
        await client.query("COMMIT");
      } catch (e) {
        await client.query("ROLLBACK");
        throw "Someting went wrong";
      } finally {
        client.release();
      }
    });
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

const updateUser = ({ newName, newEmail, newPassword, userId }) => {
  const sqlQuery = `update users SET name = $1, email=$2, password=$3 WHERE id =$4`;
  return pool
    .query(sqlQuery, [newName, newEmail, newPassword, userId])
    .then(result => result.rows);
  };
  
const getUserLanguages = id => {
  const sqlQuery = `SELECT l.name as language_name
        from users as u 
        INNER JOIN users_languages as u_l 
          on u_l.user_id = u.id
        INNER JOIN languages as l
          on l.code = u_l.language_code 
        where u.id = $1`;
  return pool.query(sqlQuery, [id]).then(result => result.rows);
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  getUserLanguages
};
