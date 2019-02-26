'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Product = require('./Product');

const Tag = db.define('Tag', {
    id_tag: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(100)
});

Product.hasMany(Tag, { foreignKey: 'id_product' });
Tag.belongsTo(Product, { foreignKey: 'id_product' });

Tag.sync();

module.exports = Tag;