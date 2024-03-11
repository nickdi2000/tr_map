const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");
const axios = require("axios");
const baseUrl = config.baseUrl || "https://electosense.com/api/v1/";
const fs = require("fs").promises;
const Handlebars = require("handlebars");
const messageService = require("./message.service");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== "test") {
	transport
		.verify()
		.then(() => logger.info("Connected to email server"))
		.catch(() =>
			logger.warn(
				"Unable to connect to email server. Make sure you have configured the SMTP options in .env"
			)
		);
}

const sendEmail = async (to, subject, text) => {
	const msg = { from: config.email.from, to, subject, text };
	await transport.sendMail(msg);
};

const sendPostMark = async (req, res) => {
	const product_name = "ElectoSense";
	console.log("dir", __dirname);
	const htmlContent = await fs.readFile(
		__dirname + "/mail_templates/welcome.html",
		"utf8"
	);

	const data = {
		From: "contact@electosense.com",
		To: "nick@webfly.io",
		TemplateId: 34213676,
		TemplateModel: {
			product_name: "ElectoSense",
			name: "George",
			action_url: "https://electosense.com",
			support_url: "https://electosense.com/support",
			username: "George",
			login_url: "https://electosense.com",
			sender_name: "Nick",
		},

		//Subject: "Welcome to " + product_name,
		//TextBody: "Hello,",
		//HtmlBody: htmlContent,
		//"<html><body><strong>Hello</strong> dear ElectoSense user.</body></html>",
		MessageStream: "outbound",
	};

	axios
		.post("https://api.postmarkapp.com/email/withTemplate", data, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_KEY, //"15be4f25-43c4-43c4-88f0-283bd53cd0fa", // Replace with your actual server token
			},
		})
		.then((response) => {
			console.log("Email sent successfully:", response.data);
			res.send("Email Sent");
		})
		.catch((error) => {
			console.error("Error sending email:", error);
			res.send("Error sending email");
		});
};

const sendPostmarkEmail = async (
	to = "nick@webfly.io",
	subject = "ElectoSense",
	text = "Welcome to ElectoSense.com"
) => {
	const htmlTemplate = await fs.readFile(
		__dirname + "/mail_templates/welcome.html",
		"utf8"
	);

	let template = Handlebars.compile(htmlTemplate);
	let htmlContent = template({ messageBody: text });

	const data = {
		From: "contact@webfly.io",
		To: to,
		Subject: subject,
		TextBody: text,
		HtmlBody: htmlContent,
		MessageStream: "outbound",
	};

	axios
		.post("https://api.postmarkapp.com/email", data, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_KEY, //"15be4f25-43c4-43c4-88f0-283bd53cd0fa", // Replace with your actual server token
			},
		})
		.then((response) => {
			console.log("Email sent successfully:", response.data);
			return "Message Sent";
		})
		.catch((error) => {
			console.error("Error sending email:", error);
			return "Message failed to send";
		});
};

const sendTemplateEmail = async (
	template_id = 34214622,
	to = "nick@webfly.io",
	params = {}
) => {
	const product_name = "ElectoSense";

	const data = {
		From: "ElectoSense contact@webfly.io",
		To: to,
		TemplateId: template_id,
		TemplateModel: {
			product_name: product_name,
			message: params.message ?? "",
			action_url: params.action_url ?? "https://electosense.com",
			support_url: "https://electosense.com/support",
			login_url: "https://electosense.com",
			sender_name: "Nick",
		},
		MessageStream: "outbound",
	};

	const rec = await axios.post(
		"https://api.postmarkapp.com/email/withTemplate",
		data,
		{
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-Postmark-Server-Token": process.env.POSTMARK_KEY,
			},
		}
	);
	console.log("PostMark Response", rec.status);
	return rec;
};

const sendWelcomeEmail = async (email) => {
	console.log("sending email ", email);
	const templateId = 34213676;
	const params = {
		action_url: "https://electosense.com/account/activate?email=" + email,
	};
	const rec = await sendTemplateEmail(templateId, email, params);

	return rec.status === 200;
};

const contactSendMail = async (req, res) => {
	const { comments, email, userId } = req.body;
	const to = "nick@webfly.io";
	const subject = "ElectoSense Contact Form";
	const text = "Email from: " + email + "<br/>\nComments:" + comments;
	console.log("from", config.email.from);

	const msg = { from: config.email.from, to, subject, text };
	//await transport.sendMail(msg);
	const params = {
		message: text,
	};

	await messageService.insertMessage({
		subject: subject,
		body: comments,
		type: "contact",
		user: userId,
	});

	//await sendPostmarkEmail(to, subject, text);
	await sendTemplateEmail(34214622, to, params);
	res.status(200).json({ message: "Contact Email sent successfully" });
};

const sendResetPasswordEmail = async (to, token) => {
	const subject = "Reset password";
	// replace this url with the link to the reset password page of your front-end app
	const resetPasswordUrl = `${baseUrl}/reset-password?token=${token}`;
	const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
	await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
	const subject = "Email Verification";
	// replace this url with the link to the email verification page of your front-end app
	const verificationEmailUrl = `${baseUrl}/verify-email?token=${token}`;
	const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
	await sendEmail(to, subject, text);
};

module.exports = {
	sendEmail,
	sendResetPasswordEmail,
	sendVerificationEmail,
	contactSendMail,
	sendPostMark,
	sendWelcomeEmail,
};
