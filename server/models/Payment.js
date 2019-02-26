'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Order = require('./Order');

const Payment = db.define('Payment', {
    id_payment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: Sequelize.STRING(60),
    description: Sequelize.STRING
});

Order.hasMany(Payment, { foreignKey: 'id_order' });
Payment.belongsTo(Order, { foreignKey: 'id_order' });

Payment.sync();

module.exports = Payment;