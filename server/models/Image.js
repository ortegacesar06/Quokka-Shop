'use strict';
const Sequelize = require ('sequelize');
const db = require ('../database');
const Product = require('./Product');

const Image = db.define('Image', {
    id_image:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    path: Sequelize.STRING
    
});

Product.hasMany(Image, {foreignKey: 'id_product'});
Image.belongsTo(Product,{foreignKey:'id_product'});

Image.sync();


module.exports = Image;

