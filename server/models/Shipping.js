'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Order = require('./Order');

const Shipping = db.define('Shipping', {
    id_shipping: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: Sequelize.STRING(60),
    description: Sequelize.STRING,
    address: Sequelize.STRING,
    city: Sequelize.STRING
});

Order.hasMany(Shipping, { foreignKey: 'id_order' });
Shipping.belongsTo(Order, { foreignKey: 'id_order' });

Shipping.sync();

module.exports = Shipping;