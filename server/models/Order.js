'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Person = require('./Person');

const Order = db.define('Order', {
    id_order: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    num_order: Sequelize.INTEGER,
    tax: Sequelize.DECIMAL(10,2),
    total: Sequelize.DECIMAL(10,2),
    state: { type: Sequelize.BOOLEAN, defaultValue: true },
    external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
});

Person.hasMany(Order, { foreignKey: 'id_person' });
Order.belongsTo(Person, { foreignKey: 'id_person' });
Order.sync();

module.exports = Order;