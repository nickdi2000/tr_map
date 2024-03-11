const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const musicianSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		instrument: {
			type: String,
			required: false,
			trim: true,
		},
		isBackup: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const trackSchema = mongoose.Schema(
	{
		artist: {
			type: String,
			required: true,
			trim: true,
		},
		track: {
			type: String,
			required: true,
			trim: true,
		},
		submitted_by: {
			type: String,
			trim: true,
		},
		sort: {
			type: Number,
		},
		status: {
			type: String,
			enum: ["active", "archived", "requested"],
			default: "active",
		},
		musicians: [musicianSchema],
	},

	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

// trackSchema.virtual("instruments").get(function () {
// 	return this.musicians.map((musician) => musician.instrument);
// });
//if we wanted to do the above function but exclude where the musician is a backup, we could do this:
trackSchema.virtual("instruments").get(function () {
	return this.musicians
		.filter((musician) => {
			return !musician.isBackup;
		})
		.map((musician) => musician.instrument);
});

// add plugin that converts mongoose to json
trackSchema.plugin(toJSON);
trackSchema.plugin(paginate);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
