// controllers/MessageController.js
const BaseController = require("./baseController");
const { Message } = require("../models");
class MessageController extends BaseController {
	constructor() {
		super(Message);
	}

	inbound = async (req, res) => {
		const { body } = req;
		console.log("inbound message", body);
		res.send("Made it");
	};
}

module.exports = new MessageController();
