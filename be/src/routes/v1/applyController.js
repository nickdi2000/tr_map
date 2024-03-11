// applyController.js
const coreRouter = require("./_coreRouter");

function applyController(controller) {
	return (req, res, next) => {
		req.controller = controller;
		coreRouter.handle(req, res, next);
	};
}

module.exports = applyController;
