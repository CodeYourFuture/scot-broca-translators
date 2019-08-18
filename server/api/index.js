const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");

router.use("/users", users);
router.use("/status", status);

module.exports = router;
