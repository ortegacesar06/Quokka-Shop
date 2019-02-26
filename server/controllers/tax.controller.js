'use strict';
const Sequelize = require('sequelize');
const Tax = require('../models/Tax');

const TaxController = {};

TaxController.getTaxList = (req, res) => {
    Tax.findAll({
        order: [
            [Sequelize.col('id_tax'), 'DESC']
        ]
    })
    .then((taxs) => {
        res.status(200).json(taxs);
    })
    .catch((err) =>{
        res.status(500).json(err);
    });
};

TaxController.saveTax = (req, res) => {
    Tax.create({
        percentage: req.body.percentage,
        description: req.body.description
    })
    .then(() => {
        res.status(201).json();
    })
    .catch(() => {
        res.status(500).json();
    });
};

TaxController.getTax = (req, res) => {
    Tax.findOne({
        where: { id_tax: req.params.id }
    })
    .then((tax) => {
        tax = tax.toJSON();
        delete tax.id_tax;
        res.status(200).json(tax);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};

TaxController.editTax = (req, res) => {
    Tax.update({
        percentage: req.body.percentage,
        description: req.body.description
    },{
        where: { id_tax: req.params.id }
    })
    .then(() => {
        res.status(200).json();
    })
    .catch(() => {
        res.status(500).json(err);
    });
};

module.exports = TaxController;

