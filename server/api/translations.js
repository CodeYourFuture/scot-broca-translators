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
    console.log(req.body);
    const start_date = new Date();
    const user_id = req.user.id;
    const document_id = req.body.document_id;

    const role = req.user.role;

    const newTranslation = {
      user_id,
      document_id,
      start_date
    };
  

    if (role !== INTERPRETER) {
      res.status(400).send("error");
    } else {
      const getTranslations = translationDb.getTranslationByDocumentId(
        document_id
      );
      getTranslations.then(translations => {
        if (translations.length !== 0) {
          res.status(400).send("error");
        } else {
          translationDb.createTranslation(newTranslation);
          documentDb.updateDocumentStatusById("Processing", document_id);
          res.send("The translation record has been created");
        }
      });
    }
  }
);

module.exports = router;
