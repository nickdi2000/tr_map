const mongoose = require("mongoose");

const { toJSON, paginate } = require("./plugins");

/* ------------------ */

const optionSchema = new mongoose.Schema({
	name: String,
	campaign: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
	description: String,
	// Additional fields as needed (e.g., candidate details)
});

optionSchema.plugin(toJSON);
optionSchema.plugin(paginate);
const Option = mongoose.model("Option", optionSchema);
module.exports.Option = Option;

// IMPORT THE REST FROM OTHER FILES
module.exports.Token = require("./token.model");
module.exports.User = require("./user.model");
module.exports.Organization = require("./organization.model");
module.exports.Campaign = require("./campaign.model");
module.exports.Message = require("./message.model");
module.exports.Candidate = require("./candidate.model");
module.exports.Vote = require("./vote.model");
module.exports.Track = require("./track.model");
