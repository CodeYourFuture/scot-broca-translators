const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../services/database/users");
const {
  emailValidate,
  nameValidate,
  passwordValidate,
  roleValidate
} = require("./validator.js");

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

  const errorMessages = [];

  if (!emailValidate(email)) {
    errorMessages.push("The email format is incorrect");
  }

  if (!nameValidate(name)) {
    errorMessages.push("Name is required");
  }

  if (!passwordValidate(password)) {
    errorMessages.push("The password must have at least 8 characters");
  }

  if (!roleValidate(role)) {
    errorMessages.push("Role  is required");
  }

  if (errorMessages.length != 0) {
    return res.status(400).send({
      success: false,
      message: errorMessages.join(", ")
    });
  }

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

      next(err);
    });
});

//Documents created

router.post("/", async (req, res, next) => {
  const { status, submission_date, format, owner_id } = req.body;
  const document = {
    status,
    submission_date,
    format,
    owner_id
  };
  db.createDocument(document)
    .then(() => {
      res.send({
        success: true,
        message: "Document created"
      });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
module.exports = router;
