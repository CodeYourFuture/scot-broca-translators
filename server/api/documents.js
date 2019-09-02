const express = require("express");
const router = express.Router();
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, role } = req.user;

    let getDocumentFunction;
    if (role === INTERPRETER) {
      getDocumentFunction = docsDb.getAllDocuments;
    } else {
      getDocumentFunction = () => docsDb.getUserDocuments(id);
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

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const documentId = req.params.id;

    docsDb
      .getDocumentById(documentId)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(500);
      });
  }
);

module.exports = router;
