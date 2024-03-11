const express = require("express");

const superController = require("../../controllers/super.controller");

const router = express.Router();

router.route("/campaigns").get(superController.list);
//router.route("/method/:method").get(superController[method]);

router.get("/method/:method", (req, res) => {
	const method = req.params.method;
	superController[method](req, res);
});

router.get("/method/:method/:id", (req, res) => {
	const method = req.params.method;
	superController[method](req, res);
});

router.delete("/method/:method/:id", (req, res) => {
	const method = req.params.method;
	superController[method](req, res);
});

module.exports = router;
