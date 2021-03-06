const express = require("express");
const passport = require("passport");
const translationDb = require("../services/database/translations");
const documentDb = require("../services/database/documents");
const { INTERPRETER } = require("../auth/roles");
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const start_date = new Date();
    const user_id = req.user.id;
    const document_id = req.body.document_id;
    const role = req.user.role;

    const newTranslation = {
      user_id,
      document_id,
      start_date
    };

    const selectedDocument = documentDb.checkDocumentId(document_id);
    selectedDocument.then(document => {
      if (document.length == 0) {
        res.status(400).send("Document does not exist");
      }
    });

    if (role !== INTERPRETER) {
      res.status(400).send("error");
    } else {
      const getTranslations = translationDb.getTranslationByDocumentId(
        document_id
      );

      getTranslations.then(translations => {
        if (translations.length !== 0) {
          res.status(400).send("This translation is already picked ");
        } else {
          translationDb
            .createTranslation(newTranslation)
            .then(() =>
              documentDb.updateDocumentStatusById("Processing", document_id)
            )
            .then(() => res.send("The translation record has been created"))
            .catch(error => res.status(400).send("An error ocurred " + error));
        }
      });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const translationId = req.params.id;

    if (req.user === false) {
      return res.send("Unauthorised");
    } else {
      return translationDb
        .getTranslationByTranslationtId(translationId)
        .then(data => {
          if (data.length === 0) {
            return res.status(400).send("No translation available");
          } else {
            res.send(data[0]);
          }
        });
    }
  }
);

router.put(
  `/:id`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const translationId = req.params.id;
    const content = req.body.content;

    if (req.user == null || req.user == undefined) {
      res.status(401).send("User Unauthorised");
      return;
    }

    if (content == null || content.length === 0) {
      res.status(400).send("please enter content to update");
      return;
    }
    const userId = req.user.id;

    translationDb
      .updateTranslation(content, translationId, userId)
      .then(data => {
        if (data != null && data.length > 0) {
          getDocumentIdByTranslationId(translationId).then(documentId => {
            documentDb.updateDocumentStatusById("Completed", documentId);
          });
          res.send(data);
        } else {
          res
            .status(400)
            .send("the document is not found or not assigned to you");
        }
      })
      .catch(err => {
        res.status(500).send("An error occured");
      });
  }
);

router.delete(
  `/:id`,
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const translationId = req.params.id;
    const userId = req.user.id;
    translationDb
      .getUserIdByTranslationId(translationId)
      .then(userIdTrans => {
        if (userId !== userIdTrans) {
          throw {
            errorCode: 401,
            errorMessage: "the user id and translationid do not match"
          };
        }

        return documentDb.getDocumentIdByTranslationId(translationId);
      })
      .then(documentId => {
        return documentDb
          .checkDocumentStatus(documentId)
          .then(status => {
            if (status == "Processing") {
              return translationDb.deleteTranslation(translationId);
            } else {
              throw {
                errorCode: 400,
                errorMessage: "the document status is not in process"
              };
            }
          })
          .then(() =>
            documentDb.updateDocumentStatusById("Waiting", documentId)
          )
          .then(() => res.send("changed status"));
      })

      .catch(err => {
        if (err.errorCode) {
          res.status(err.errorCode).send(err.errorMessage);
        } else {
          res.status(500).send("un expected error");
        }
      });
  }
);

const getDocumentIdByTranslationId = translationId => {
  return documentDb
    .getDocumentIdByTranslationId(translationId)
    .then(data => {
      return data;
    })
    .catch(err => {
      res.send(400, err);
    });
};

module.exports = router;
