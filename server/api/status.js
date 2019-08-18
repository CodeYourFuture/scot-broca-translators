const express = require("express");
const router = express.Router();
const passport = require("passport");

/** route is /status/ (status is defined as prefix in index.js) */
router.get("/", (req, res) => {
	res.send("All good");
});

/**
 * This route (/status/protected) is protected. If you GET /api/protected-status without a valid token
 * then it will 403 (forbidden). Check the README for information on how to authenticate and get a token
 */
router.get(
	"/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.send("All good");
	}
);

module.exports = router;
