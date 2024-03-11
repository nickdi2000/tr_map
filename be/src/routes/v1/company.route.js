const express = require('express');
const companyController = require('../../controllers/company.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

// router.route('/').get(companyController.get);

router.route('/').post(companyController.insert);
router.route('/update').post(companyController.update);

router.route('/').get(companyController.getCompany);
router.route('/code/:code').get(companyController.getByCode);

module.exports = router;
