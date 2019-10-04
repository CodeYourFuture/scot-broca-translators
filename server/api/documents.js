const express = require("express");
const passport = require("passport");
const docsDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");
const { dateValidate } = require("../auth/validator.js");
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

    if (
      document.name === null ||
      document.name === "" ||
      document.due_date === null ||
      document.due_date === ""
    ) {
      return res.status(400).send("Some mandatory field is missing");
    } else if (!dateValidate(document.due_date)) {
      return res.status(400).send("The due_date format is incorrect");
    } else if (document.content === null || document.content === "") {
      return res.status(400).send("Some mandatory field is missing");
    }

    docsDb
      .createDocument(document)
      .then(() => {
        return res.send("Saved");
      })
      .catch(e => {
        return res.status(500).send("An error occurred ");
      });
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

router.delete(
  `/:id`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const documentId = req.params.id;
    const userId = req.user.id;

    if (req.user === false) {
      return res.send("Unauthorised");
    } else {
      docsDb
        .checkDocumentStatus(documentId)
        .then(status => {
          if (status !== "Waiting") {
            throw {
              errorCode: 400,
              errorMessage: "Can not delete this document"
            };
          }

          return docsDb.checkUserIdFromDocument(userId);
        })
        .then(owner_id => {
          if (owner_id === userId) {
            docsDb.deleteDocument(documentId).then(() => {
              return res.send("");
            });
          } else {
            return res.status(400).send("Error");
          }
        })
        .catch(err => {
          if (err.errorCode) {
            res.status(err.errorCode).send(err.errorMessage);
          } else {
            res.status(500).send("Error");
          }
        });
    }
  }
);

module.exports = router;
