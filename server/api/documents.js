const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let user = req.user.role;
    console.log(user);

    if (user) {
      getIterpreterDocuments(res);
    } else {
      getUserDocuments();
    }
  }
);

function getIterpreterDocuments(res) {
  docsDb
    .getAllDocuments()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}
function getUserDocuments(res) {
  docsDb
    .getUserDocuments()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
}
module.exports = router;
