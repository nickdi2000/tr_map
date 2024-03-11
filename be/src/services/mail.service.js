const nodemailer = require("nodemailer");
const nodemailerMailgunTransport = require("nodemailer-mailgun-transport");
const { emailService } = require("../services");
const formData = require("form-data");

const mailgun = require("mailgun-js");
const DOMAIN = "webfly.io";
const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });

const userSignup = async (user) => {
	return false;
};

const sendWelcomeEmail = async (email) => {
	if (process.env.NODE_ENV === "development") {
		return;
	}
	const data = {
		from: "Electo Sense <postmaster@webfly.io>",
		to: email,
		bcc: "nickdifelice@gmail.com",
		subject: "Hello",
		template: "Welcome to Electosense",
		"h:X-Mailgun-Variables": { test: "test" },
	};
	mg.messages().send(data, function (error, body) {
		console.log(body);
	});
};

async function sendMail(user = {}) {
	console.log("Sending mail...");
	let htmlBody =
		"<p>A new user has Registered for  <strong>ElectoSense</strong>!</p>";
	htmlBody += `Email: ${user.email}<br/>`;
	htmlBody += `Name: ${user.name}<br/>`;

	const send = await emailService.sendEmail(
		user.email,
		"New ElectoSense ElectoSense Signup",
		htmlBody
	);
	return send;
}

async function sendMailApi(user = {}) {
	const pubKey = process.env.MAIL_PUB_KEY;
	const apiKey = process.env.MAIL_API_KEY;
	//const domain = 'https://api.mailgun.net/v3/sandboxd93abfede72244559b86a0f3f6696815.mailgun.org';

	const smtpUsername = process.env.SMTP_USERNAME;
	const smtpPassword = process.env.SMTP_PASSWORD;

	const transporter = nodemailer.createTransport({
		host: "smtp.mailgun.org",
		port: 587,
		secure: false, // Use STARTTLS
		auth: {
			user: smtpUsername,
			pass: smtpPassword,
		},
	});

	let htmlBody =
		"<p>A new user has Registered for  <strong>ElectoSense</strong>!</p>";
	htmlBody += `Email: ${user.email}<br/>`;
	htmlBody += `Name: ${user.name}<br/>`;

	const mailOptions = {
		from: smtpUsername,
		to: "nickdifelice@gmail.com",
		subject: "New ElectoSense Signup",
		text: "A new user has registered for ElectoSense!",
		html: htmlBody,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Message sent:", info.messageId);
	} catch (error) {
		console.error("Error sending email:", error);
	}
}

module.exports = {
	userSignup,
	sendMail,
	sendWelcomeEmail,
};
