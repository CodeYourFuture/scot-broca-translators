const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");
const documents = require("./documents");
const translations = require("./translations");

router.use("/users", users);
router.use("/status", status);
router.use("/documents", documents);
router.user("/translations", translations);

module.exports = router;
