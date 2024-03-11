const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},
	contactEmail: {
		type: String,
		trim: true,
	},
	contactNumber: String,
	address: {
		street: String,
		city: String,
		state: String,
		zipCode: String,
		country: String,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	campaigns: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Campaign",
		},
	],
	// Additional fields like website, social media links, etc.
	website: String,
	// Timestamps
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
});

module.exports = mongoose.model("Organization", organizationSchema);
