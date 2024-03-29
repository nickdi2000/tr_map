const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");
const { roles } = require("../config/roles");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},

		// email: {
		// 	type: String,
		// 	required: false,
		// 	unique: true,
		// 	trim: true,
		// 	lowercase: true,
		// 	validate(value) {
		// 		if (!validator.isEmail(value)) {
		// 			throw new Error("Invalid email");
		// 		}
		// 	},
		// },
		// password: {
		// 	type: String,
		// 	required: false,
		// 	trim: true,
		// 	minlength: 6,
		// 	validate(value) {
		// 		if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
		// 			throw new Error(
		// 				"Password must contain at least one letter and one number"
		// 			);
		// 		}
		// 	},
		// 	private: true, // used by the toJSON plugin
		// },
	},
	{
		timestamps: true,
	}
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
// 	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
// 	return !!user;
// };

// userSchema.methods.isPasswordMatch = async function (password) {
// 	const user = this;
// 	return bcrypt.compare(password, user.password);
// };

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
