const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const role = req.user.role;

    let getDocumentFunction;
    if (role === INTERPRETER) {
      getDocumentFunction = docsDb.getAllDocuments;
    } else {
      getDocumentFunction = docsDb.getUserDocuments;
    }

    getDocumentFunction()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(500);
      });
  }
);

module.exports = router;
