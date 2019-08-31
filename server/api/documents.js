const express = require("express");
const passport = require("passport");
const docsDb = require("../services/database/documents");
const router = express.Router();

router.post("/", async (req, res) => {
  const { fromLanguage, toLanguage, dueDate, text, user } = req.body;
  const document = {
    fromLanguage,
    toLanguage,
    dueDate,
    text,
    user
  };

  console.log(document.fromLanguage);
  console.log(document.text);

  return res.send("Saved");
});

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
