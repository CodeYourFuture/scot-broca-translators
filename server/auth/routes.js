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

  if (
    user.email != null &&
    user.email.length > 1 &&
    user.password != null &&
    user.password.length > 1 &&
    user.name != null &&
    user.name.length > 1 &&
    user.role != null &&
    user.role.length > 1 &&
    (user.role == "Interpreter" || user.role == "User")
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
    res.send({
      success: false,
      message: "Empty Validation"
    });
  }
});

module.exports = router;
