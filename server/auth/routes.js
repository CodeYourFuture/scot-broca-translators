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
    validateEmailAddress(email) &&
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
        res.status(400).send({
          success: false,
          message: err
        });
        console.log(err);
        next(err);
      });
  } else {
    res.send(err);
  }
  function validateEmailAddress(email) {
    var expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if (expression.test(String(email).toLowerCase())) {
      return true;
    } else {
      res.status(400).send({
        success: false,
        message: "The email format is incorrect."
      });
      return false;
    }
  }

  //   function validateEmail(email) {
  //     if (email == null || email.length == 0 && email.includes("@")) {
  //       res.status(400).send({
  //         success: false,
  //         message: "Email required"
  //       });
  //       return false;
  //     } else return true;
  //   }

  function validateName(name) {
    if (name == null || name.length == 0) {
      res.status(400).send({
        success: false,
        message: "name is required"
      });
      return false;
    } else return true;
  }

  // password is invalid...

  function validatePassword(password) {
    var password_pattern = /[a-z0-9_]{8,20}/i;
    if (!password_pattern.test(password)) {
      res.status(400).send({
        success: false,
        message: "The password must have at least 8 characters"
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
