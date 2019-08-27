const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../services/database/users");

/**
 * Users Login
 */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`Login attempt ${email}`);
  try {
    const user = await db.getUserByEmail(email);

    if (!email || !password || !user || password !== user.password) {
      return res.sendStatus(403);
    }

    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    const token = jwt.sign({ userId: user.id }, secret);
    delete user.password;
    delete user.salt;
    return res.send({ token, user });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * Users Registration
 */
router.post("/register", async (req, res, next) => {
  const { email, password, name, role } = req.body;

  const user = {
    email,
    password,
    name,
    role
  };

  //   if (
  //     user.email != null &&
  //     user.email.length > 1 &&
  //     user.password != null &&
  //     user.password.length > 1 &&
  //     user.name != null &&
  //     user.name.length > 1 &&
  //     user.role != null &&
  //     user.role.length > 1 &&
  //     (user.role == "Interpreter" || user.role == "User")
  //   ) {

  //   } else {
  //     res.status(400).send({
  //       success: false,
  //       message: "Empty Validation"
  //     });
  //   }

  if (
    validateEmail(email) &&
    validateName(name) &&
    validatePassword(password) &&
    validateRole(role)
  ) {
    db.createUser(user)
      .then(() => {
        res.send({
          success: true,
          message: "Account created"
        });
      })
      .catch(err => {
        console.log(err);
        next(err);
      });
  } else {
    res.send(err);
  }

  function validateEmail(email) {
    if (email == null || email.length == 0) {
      res.status(400).send({
        success: false,
        message: "Email required"
      });
      return false;
    } else return true;
  }

  function validateName(name) {
    if (name == null || name.length == 0) {
      res.status(400).send({
        success: false,
        message: "name is required"
      });
      return false;
    } else return true;
  }
  function validatePassword(password) {
    if (password == null || password.length == 0) {
      res.status(400).send({
        success: false,
        message: "password is required"
      });
      return false;
    } else return true;
  }
  function validateRole(role) {
    if (role == null || role.length == 0) {
      res.status(400).send({
        success: false,
        message: "role  is required"
      });
      return false;
    } else return true;
  }
});

module.exports = router;
