const express = require("express");
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");
const router = express.Router();

router.post(
  "/:id/translations",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id, user_id, document_id, start_date } = req.body;
    const start_date = new Date();
    const user_id = req.user.id;
    const document_id = req.document.id;

    const translation = {
      id,
      user_id,
      document_id,
      start_date,
      status = "Processing"
    };
     

    if(role !== INTERPRETER || document_id.length > 0) {
      res.status(400).send("error") 

    } else
     {
      docsDb.createTranslation(translation)
      res.send("Selected");
    };
    
  }
);

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
    docsDb.createDocument(document);

    return res.send("Saved");
  }
);

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
