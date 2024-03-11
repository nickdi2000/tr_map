const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const candidateSchema = new mongoose.Schema(
	{
		name: String,
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		description: String,
		options: Object,
		color: String,
		order: Number,
		image: String,

		campaign: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Campaign",
			required: true,
		},
		// Additional fields (e.g., candidate rules, status)
	},
	{
		timestamps: true,
	}
);

candidateSchema.plugin(toJSON);
candidateSchema.plugin(paginate);

// candidateSchema.virtual("imagePath").get(function () {
// 	return `/storage/${this.image}`;
// });

const Candidate = mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;
