const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { Family } = require("../models");
const {
	authService,
	userService,
	tokenService,
	emailService,
	slackService,
} = require("../services");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const isProduction = process.env.NODE_ENV === "production";

const register = catchAsync(async (req, res) => {
	let userData = req.body;

	try {
		// Create the user
		const user = await userService.createUser(userData);
		//const tokens = await tokenService.generateAuthTokens(user);
		// if (isProduction || true) {
		// 	slackService.registerNotifiy(req.body);
		// }

		res.status(httpStatus.CREATED).send({ user, tokens });
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: err.message });
	}
});

const guestRegister = catchAsync(async (req, res) => {
	let userData = req.body;

	try {
		// Create the user
		const user = await userService.createUser(userData);
		res.status(httpStatus.CREATED).send({ user });
	} catch (err) {
		console.log(err);
		res.status(400).send({ message: err.message });
	}
});

const login = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	const user = await authService.loginUserWithEmailAndPassword(email, password);
	const tokens = await tokenService.generateAuthTokens(user);

	if (isProduction && req.body.email != "admin@webfly.io") {
		slackService.loginNotify(req.body.email);
	}

	req.session.save((err) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		console.log("saving sesssion..");
		res.send({ user, tokens });
	});
});

const googleLogin = catchAsync(async (req, res) => {
	try {
		const { token } = req.body; // 'token' is the ID token sent from frontend
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const userid = payload["sub"]; // Google's unique ID for the user

		const { email, name } = payload;

		// Check if the user exists in your database or create a new one
		const user = await userService.getUserByEmail(email);
		const tokens = await tokenService.generateAuthTokens(user);

		req.session.save((err) => {
			if (err) {
				console.log(err);
				return next(err);
			}
		});
		res.send({ user, tokens });
	} catch (error) {
		console.log("error", error);
		res
			.status(401)
			.json({ success: false, message: "Invalid token - AuthController" });
	}
});

const logout = catchAsync(async (req, res) => {
	await authService.logout(req.body.refreshToken);
	res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
	const tokens = await authService.refreshAuth(req.body.refreshToken);
	res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email
	);
	await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
	res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
	await authService.resetPassword(req.query.token, req.body.password);
	res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
	const verifyEmailToken = await tokenService.generateVerifyEmailToken(
		req.user
	);
	await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
	res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
	await authService.verifyEmail(req.query.token);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	register,
	login,
	logout,
	refreshTokens,
	forgotPassword,
	resetPassword,
	sendVerificationEmail,
	verifyEmail,
	googleLogin,
	guestRegister,
};
