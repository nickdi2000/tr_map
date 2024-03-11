const express = require('express');
const aiController = require('../../controllers/ai.controller');

const router = express.Router();

router.route('/').get(aiController.test);

module.exports = router;
