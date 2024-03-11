const express = require("express");
const baseRoute = require("./base.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const campaignsRoute = require("./campaigns.route");
const testRoute = require("./test.route");
const guestRoute = require("./guest.route");
const superRoute = require("./super.route");
const aiRoute = require("./ai.route");
const config = require("../../config/config");
const getUser = require("../../middlewares/getUser");

const router = express.Router();

const defaultRoutes = [
	{
		path: "/test",
		route: testRoute,
	},
	{
		path: "/auth",
		route: authRoute,
	},
	{
		path: "/users",
		route: userRoute,
	},

	{
		path: "/ai",
		route: aiRoute,
	},

	{
		path: "/guest",
		route: guestRoute,
	},
	{
		path: "/campaigns",
		route: campaignsRoute,
	},

	{
		path: "/message",
		route: baseRoute,
	},
	{
		path: "/super",
		route: superRoute,
	},
	{
		path: "/",
		route: baseRoute,
	},
];

const devRoutes = [
	// routes available only in development mode
];

defaultRoutes.forEach((route) => {
	router.use(route.path, getUser, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

module.exports = router;
