const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
);

module.exports = router;
