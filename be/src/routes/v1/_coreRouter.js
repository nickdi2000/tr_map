// coreRouter.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
	req.controller.upsert(req, res, next);
});

router.get("/", (req, res, next) => {
	req.controller.list(req, res, next);
});

router.get("/:id", (req, res, next) => {
	req.controller.show(req, res, next);
});

// Define other routes (PUT, DELETE, etc.) similarly

module.exports = router;
