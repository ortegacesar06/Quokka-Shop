const express = require('express');
const router = express.Router();

const companyController = require('../controllers/company.controller');

router.get('/', companyController.getCompanyList)
        .post('/', companyController.saveCompany);
router.get('/:id', companyController.getCompany)
        .put('/:id', companyController.editCompany);

module.exports = router;