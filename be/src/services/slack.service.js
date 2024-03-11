const axios = require("axios");

const url = "https://webfly.io/sendmail/send?slack=true&key=goochytobi2023";

const sendMessage = async (email, message) => {
	const data = {
		name: "",
		email: email,
		body: message,
		channel: "C06BT7TAWR2", //electosense private
		service: "electosense",
	};

	const rec = await axios.post(url, data);
	return rec;
};

const loginNotify = async (email) => {
	const message = "User has logged in";
	return await sendMessage(email, message);
};

const registerNotifiy = async (body) => {
	const email = body.email;
	const utm = body.utm_source;
	const message = "User has registered | UTM: " + utm;
	return await sendMessage(email, message);
};

module.exports = {
	sendMessage,
	loginNotify,
	registerNotifiy,
};
