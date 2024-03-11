const { Message } = require("../models");

/*
    subject: String,
    body: String,
    type: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

*/

const insertMessage = async (data) => {
	const message = new Message(data);
	await message.save();
	return message;
};

module.exports = {
	insertMessage,
};
