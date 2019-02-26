'use strict';
const Sequelize = require('sequelize');
const Promotion = require('../models/Promotion');

const PromotionController = {};

PromotionController.getPromotionList = (req, res) => {
    Promotion.findAll({
        order: [
            [Sequelize.col('id_promotion'), 'DESC']
        ]
    })
    .then((promotions) => {
        res.status(200).json(promotions);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

PromotionController.savePromotion = (req, res) => {
    Promotion.create({
        name: req.body.name,
        description: req.body.description,
        percentage: req.body.percentage,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    })
    .then(() => {
        res.status(201).json();
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

PromotionController.getPromotion = (req, res) => {
    Promotion.findOne({
        where: { id_promotion: req.params.id }
    }).then((promotion) => {
        promotion = promotion.toJSON();
        delete promotion.id_promotion;
        res.status(200).json(promotion);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

PromotionController.editPromotion = (req, res) => {
    Promotion.update({
        name: req.body.name,
        description: req.body.description,
        percentage: req.body.percentage,
        start_date: req.body.start_date,
        end_date: req.body.end_date
    },{
        where: { id_promotion: req.params.id }
    })
    .then(() => {
        res.status(200).json();
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

module.exports = PromotionController;