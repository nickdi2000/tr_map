const express = require("express");
const campaignController = require("../../controllers/campaign.controller");
const applyController = require("./applyController");

const router = express.Router();

router.route("/code/:code").get(campaignController.getByCode);

router.use(applyController(campaignController));

module.exports = router;
