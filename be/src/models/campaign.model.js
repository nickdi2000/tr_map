const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

//used for wizard
const optionsSchema = new mongoose.Schema({
	key: String,
	value: String,
});

const replaceSpacesWithHyphens = (value) => {
	return value.replace(/\s+/g, "-").toLowerCase();
};

const campaignSchema = new mongoose.Schema(
	{
		title: String,
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		description: String,
		options: Object,
		voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		startDate: Date,
		endDate: Date,
		code: {
			//used for url .. electosense.com/code
			type: String,
			lowercase: true,
			set: replaceSpacesWithHyphens,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		status: {
			type: String,
			enum: ["active", "draft", "testing", "closed"],
			default: "draft",
		},

		// Additional fields (e.g., campaign rules, status)
	},
	{
		timestamps: true,
	}
);

campaignSchema.plugin(toJSON);
campaignSchema.plugin(paginate);
const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
