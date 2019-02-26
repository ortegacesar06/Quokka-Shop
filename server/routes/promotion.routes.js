const express = require('express');
const router = express.Router();

const promotionController = require('../controllers/promotion.controller');

router.get('/', promotionController.getPromotionList)
        .post('/', promotionController.savePromotion);
router.get('/:id', promotionController.getPromotion)
        .put('/:id', promotionController.editPromotion);

module.exports = router;