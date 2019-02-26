const express = require('express');
const router = express.Router();

const taxController = require('../controllers/tax.controller');

router.get('/', taxController.getTaxList)
        .post('/', taxController.saveTax);
router.get('/:id', taxController.getTax)
        .put('/:id', taxController.editTax);

module.exports = router;