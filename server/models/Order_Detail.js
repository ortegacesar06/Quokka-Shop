'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Order = require('./Order');
const Product = require('./Product');

const Order_Detail = db.define('Order_Detail', {
    id_detail: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: Sequelize.INTEGER(6)
});

Order.hasMany(Order_Detail, { foreignKey: 'id_order' });
Order_Detail.belongsTo(Order, { foreignKey: 'id_order' });

Product.hasMany(Order_Detail, { foreignKey: 'id_product' });
Order_Detail.belongsTo(Product, { foreignKey: 'id_product' });

Order_Detail.sync();

module.exports = Order_Detail;