const express = require("express");
const router = express.Router();
const superController = require("../../controllers/super.controller");

const controllers = {
	users: require("../../controllers/user.controller"),
	campaigns: require("../../controllers/campaign.controller"),
	tracks: require("../../controllers/track.controller"),
	message: require("../../controllers/message.controller"),
	vote: require("../../controllers/vote.controller"),
	// ... other model controllers
};

router.get("/super/:model", (req, res) => {
	const model = req.params.model;
	superController.list(req, res, model);
});

router.post("/:model/method/:method", (req, res) => {
	const model = req.params.model;
	const method = req.params.method;
	if (controllers[model]) {
		controllers[model][method](req, res);
		//controllers[model].upsert(req, res);
	} else {
		res.status(404).send("Model not found (post)");
	}
});

router.post("/:model", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].upsert(req, res);
	} else {
		res.status(404).send("Model not found (POST /:model)");
	}
});

router.get("/:model/:id/child/:childModel", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].listChildRecords(req, res);
	} else {
		res.status(404).send("Model not found (childModel)");
	}
});

router.get("/:model/:id", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].show(req, res);
	} else {
		res.status(404).send("Model not found (GET /:model/:id");
	}
});

router.put("/:model/:id", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].update(req, res);
	} else {
		res.status(404).send("Model not found (POST /:model)");
	}
});

router.get("/:model", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].list(req, res);
	} else {
		res.status(404).send("Model not found (GET /");
	}
});

router.delete("/:model/:id", (req, res) => {
	const model = req.params.model;
	if (controllers[model]) {
		controllers[model].destroy(req, res);
	} else {
		res.status(404).send("Model not found");
	}
});

// ... define other routes for read, update, delete ...

module.exports = router;

// router.route('/').post(getController('company').insert);
// router.route('/update').post(getController('company').update);
// router.route('/:id').get(getController('company').show);
