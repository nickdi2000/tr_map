const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const messageSchema = new mongoose.Schema(
	{
		subject: String,
		body: String,
		type: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

messageSchema.plugin(toJSON);
messageSchema.plugin(paginate);
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
