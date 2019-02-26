'use strict';

const Sequelize = require('sequelize');
const Category = require('../models/Category');

const CategoryController ={};

CategoryController.getCategoryList = (req, res) => {
    Category.findAll({
        order: [
            [Sequelize.col('id_category'), 'DESC']
        ]
    })
    .then((categorys) => {
        res.status(200).json(categorys);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
};


CategoryController.saveCategory = (req, res) =>{
    Category.create({
        name: req.body.name
    })
    .then(() => {
        res.status(201).json();
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};

CategoryController.getCategory = (req, res) =>{
    Category.findOne({
        where:{ id_category: req.params.id}
    }).then((category)=>{
        category = category.toJSON();
        delete category.id_category;
        res.status(200).json(category);
    })
    .catch((err)=>{
        res.status(500).json();
    });
};

CategoryController.editCategory = (req, res)=>{
    Category.update({
        name: req.body.name
    },{
        where:{id_category: req.params.id}
    }).then(() =>{
        res.status(200).json();
    })
    .catch((err)=>{
        res.status(500).json(err);
    });
};

module.exports  = CategoryController;