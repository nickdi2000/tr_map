// controllers/SuperController.js
//const BaseController = require("./baseController");
const { Campaign, User, Message } = require("../models");

const list = async (req, res) => {
	//const records = await Campaign.find({}).populate("user");

	try {
		const campaigns = await Campaign.find()
			.populate("user") // Populate the user field in Campaign
			.populate({
				// Nested population for messages
				path: "messages", // Path to the messages array in Campaign
				populate: { path: "user" }, // Path to the user in each Message
			});
		res.json(campaigns);
	} catch (error) {
		res.status(500).send(error);
	}

	res.send(records);
};

const listusers = async (req, res) => {
	const records = await User.find({}).populate("campaigns");
	//const records = await User.find({ deleted_at: null }).populate("campaigns");
	res.send(records);
};

const getuser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id); //.populate("campaigns");
	const campaigns = await Campaign.find({ user: id });
	const messages = await Message.find({ user: id });

	res.json({ user, campaigns, messages });
};

const deleteuser = async (req, res) => {
	const { id } = req.params;
	//set deleted_at to now
	const user = await User.findByIdAndUpdate(id, { deleted_at: Date.now() });
	res.json({ user });
};

module.exports = {
	list,
	listusers,
	getuser,
	deleteuser,
};
