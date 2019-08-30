const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const role = req.user.role;

    if (role == "Interpreter") {
      getIterpreterDocuments(res);
    } else {
      getUserDocuments(res);
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
      res.send(500);
    });
}
module.exports = router;
