const express = require("express");
const router = express.Router();
const db = require("../services/database/documents");

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

module.exports = router;
