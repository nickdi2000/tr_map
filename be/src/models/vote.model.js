const mongoose = require("mongoose");
const validator = require("validator");
const { toJSON, paginate } = require("./plugins");

const voteSchema = mongoose.Schema(
	{
		candidate: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Candidate",
			required: true,
		},
		candidate_name: {
			type: String,
			trim: false,
			required: false,
		},
		voter: {
			name: String,
			email: String,
		},
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
voteSchema.plugin(toJSON);
voteSchema.plugin(paginate);

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
