const express = require("express");
const passport = require("passport");
const docsDb = require("../services/database/translations");
const { INTERPRETER } = require("../auth/roles");
const router = express.Router();



router.post(
    "/",
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
       
      const translationId = docsDb.getTranslationByDocumentId(document_id)
      if(role !== INTERPRETER || (translationId == null && translationId.length == 0)) {
        res.status(400).send("error") 
  
      } else
       {
        docsDb.createTranslation(translation)
        res.send("Selected");
      };
      
    }
  );

  module.exports=router;