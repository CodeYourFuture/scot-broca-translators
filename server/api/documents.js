const express = require("express");
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {
      from_language_code,
      to_language_code,
      name,
      due_date,
      content
    } = req.body;
    const submission_date = new Date();
    const owner_id = req.user.id;
    const format = "Text";
    const document = {
      from_language_code,
      to_language_code,
      submission_date,
      due_date,
      owner_id,
      name,
      format,
      content
    };
    console.log(document);
    docsDb.createDocument(document);

    return res.send("Saved");
  }
);

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
