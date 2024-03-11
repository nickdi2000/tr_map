/*
My mongoose/node/express app has a Family and User model.
the User documents have a 'family' field that is a reference to the Family model.
(one to many for Family to User)
How can i get one family by id, and all its users?
*/

const httpStatus = require("http-status");
const { User, Family } = require("../models");
const ApiError = require("../utils/ApiError");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
	// if (await User.isEmailTaken(userBody.email)) {
	// 	throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	// }
	return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
	const users = await User.paginate(filter, options);
	return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
	return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
	return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	}
	Object.assign(user, updateBody);
	await user.save();
	return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
	const user = await getUserById(userId);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	}
	await user.remove();
	return user;
};

/* FAMILY STUFF */

const createFamily = async (familyBody) => {
	return Family.create(familyBody);
};

const getFamilyById = async (familyId) => {
	const fam = await Family.findById(familyId);

	if (!fam) {
		throw new ApiError(httpStatus.NOT_FOUND, "Family not found");
	}
	return fam;
};

const getFamilyAndUsers = async (familyId) => {
	const family = await Family.findById(familyId);

	if (!family) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			"Family not found (getFamilyAndUsers)"
		);
	}

	const users = await User.find({ family: familyId });
	return { family, users };
};

const updateFamily = async (body) => {
	const familyId = body.id;
	const fam = await getFamilyById(familyId);
	if (!fam) {
		throw new ApiError(httpStatus.NOT_FOUND, "Family not found on update");
	}
	Object.assign(fam, body);
	await fam.save();
	//await transactionService.updateRemainingIncome(familyId);
	return fam;
};

module.exports = {
	createUser,
	updateFamily,
	queryUsers,
	getUserById,
	getUserByEmail,
	updateUserById,
	deleteUserById,
	getFamilyById,
	createFamily,
	getFamilyAndUsers,
};
