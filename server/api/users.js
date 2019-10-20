const express = require("express");
const router = express.Router();
const usersDb = require("../services/database/users");
const passport = require("passport");
const {
	nameValidate,
	emailValidate,
	passwordValidate,
} = require("../auth/validator");

/**
 * The route here will be: /users/ (remember the prefix users is defined in api/index.js)
 */
router.get("/", (req, res) => {
	usersDb
		.getAllUsers()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			console.error(err);
			res.send(500);
		});
});

router.put(
	"/:me",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const userId = req.user.id;
		const newName = req.body.name;
		const newPassword = req.body.password;
		const newEmail = req.body.email;
		const nameResult = nameValidate(newName);
		const emailResult = emailValidate(newEmail);
		const passwordResult = passwordValidate(newPassword);
		if (!req.user) {
			res.status(401).send("Unauthorised");
			return;
		}

		if (!nameResult || !emailResult || !passwordResult) {
			res.status(400).send("Error");
		} else {
			userDb
				.updateUser(newName, newEmail, newPassword, userId)
				.then(() => res.send(`User ${userId} updated!`))
				.catch((e) => res.send("Error"));
		}
	}
);

module.exports = router;
