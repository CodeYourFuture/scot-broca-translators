const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");
const documents = require("/documents");

router.use("/users", users);
router.use("/status", status);
router.use("/documents", documents);

module.exports = router;
