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

router.put(
  `/:id/translations`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const translationId = req.params.id;
    const content = req.body.content;

    if (content != null && content.length > 0) {
      docsDb
        .updateTranslation(content, translationId)
        .then(data => {
          console.log("this is what i am getting fom update" + data);
          if (data != null && data.length > 0) {
            getDocumentIdByTranslationId(translationId).then(data => {
              const documentId = data;
              updateDocumentStatusById(documentId, "Completed");
            });
            res.send(data);
          } else {
            // send error
            res.status(404).send("the document is not found");
          }
        })
        .catch(err => {
          res.send(500);
        });
    } else {
      res.status(400).send("pleaase inter content to update");
    }
  }
);

const updateDocumentStatusById = documentId => {
  docsDb.updateDocumentStatusById(documentId, "Completed");
};

const getDocumentIdByTranslationId = translationId => {
  return docsDb.getDocumentIdByTranslationId(translationId).then(data => {
    return data[0].document_id;
  });
};

module.exports = router;
