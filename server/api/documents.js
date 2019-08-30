const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");

router.get(
  "/auth/api/documents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let user = req.user;
    console.log(user);
    if (isInterpreter) {
      getIterpreterDocuments();
    } else {
      getUserDocuments();
    }
  }
);

function getIterpreterDocuments() {
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
function getUserDocuments() {
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
