const express = require("express");
const transactionsController = require("../../controllers/transactions.controller");

const router = express.Router();

router.route("/").post(transactionsController.insert);
router.route("/:id").delete(transactionsController.destroy);
router.route("/range").get(transactionsController.getRange);
router.route("/recurring").get(transactionsController.getRecurring);
router.route("/dashboard").get(transactionsController.getDashboard);

module.exports = router;
