const passport = require("passport");

const usersController = {};

const User = require("../models/User");

usersController.renderSignupForm = (req, res) => {
	res.render("user/signup");
};

usersController.signup = async (req, res) => {
	let errors = [];
	const { name, email, password, confirm_password } = req.body;
	if (password != confirm_password) {
		errors.push({ text: "Passwords do not match." });
	}
	if (password.length < 4) {
		errors.push({ text: "Passwords must be at least 4 characters." });
	}
	if (errors.length > 0) {
		res.render("user/signup", {
			errors,
			name,
			email,
			password,
		});
	} else {
		const emailUser = await User.findOne({ email });
		if (emailUser) {
			req.flash("error_msg", "The email is already in use.");
			res.redirect("/users/signup");
		} else {
			const newUser = new User({ name, email, password });
			newUser.password = await newUser.encryptPassword(password);
			await newUser.save();
			req.flash("success_msg", "You are registered.");
			res.redirect("/users/signin");
		}
	}
};

usersController.renderSigninForm = (req, res) => {
	res.render("user/signin");
};

usersController.signin = passport.authenticate("local", {
	failureRedirect: "/users/signin",
	successRedirect: "/notes",
	failureFlash: true,
});

usersController.logout = (req, res) => {
	req.logout();
	req.flash("success_msg", "You are logged out now");
	res.redirect("/");
};

module.exports = usersController;
