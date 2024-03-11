const express = require("express");
const aiController = require("../../controllers/ai.controller");

const router = express.Router();

router.route("/test").get(aiController.test);
router.route("/recipe/:query").get(aiController.findRecipe);
router.route("/recipe/").get(aiController.findRecipe);
router.route("/meals/:query").get(aiController.mealPlan);
router.route("/image/:query").get(aiController.getImage);

module.exports = router;
