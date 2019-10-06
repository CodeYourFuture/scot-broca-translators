const express = require("express");
const router = express.Router();
const usersDb = require("../services/database/users");
const passport = require("passport");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
  usersDb
    .getAllUsers()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

router.put(
  `/:me`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;
    const newName = req.body.name;
    const newPassword = req.body.password;
    const newEmail = req.body.email;

    const currentName = req.user.name;
    const currentEmail = req.user.email;
    const currentPassword = req.user.password;

    if (req.user == null || req.user == undefined) {
      res.status(401).send("Unauthorised");
      return;
    }

    if (newName === "" || newName.length == undefined || newName == null) {
      return currentName;
    }

    if (
      !newEmail.includes("@") ||
      newEmail === "" ||
      newEmail === undefined ||
      newEmail == null
    ) {
      return currentEmail;
    }
    if (newPassword === "" || newPassword == undefined || newPassword == null) {
      return currentPassword;
    } else {
      userDb
        .updateUser(newName, newEmail, newPassword, userId)
        .then(() => res.send(`User ${userId} updated!`))
        .catch(e => res.send("Error"));
    }
  }
);

module.exports = router;
