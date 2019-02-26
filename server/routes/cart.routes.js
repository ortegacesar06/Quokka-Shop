const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart.controller');

router.get('/all', cartController.getCart)
        .post('/add/:ext', cartController.addItem);

router.post('/plus/:ext', cartController.plusItem);
router.post('/minus/:ext', cartController.minusItem);

router.post('/process', cartController.processing);
router.get('/order', cartController.getOrder );

module.exports = router;