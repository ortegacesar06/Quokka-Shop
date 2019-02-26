'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Promotion = require('./Promotion');
const Product = require('./Product');

const Promotion_Detail = db.define('Promotion_Detail', {
    id_detail: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: Sequelize.INTEGER(6)
});
Promotion.hasMany(Promotion_Detail, { foreignKey: 'id_promotion' });
Promotion_Detail.belongsTo(Promotion, { foreignKey: 'id_promotion' });

Promotion_Detail.sync();

module.exports = Promotion_Detail;