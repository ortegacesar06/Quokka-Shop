'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Person = require('./Person');

const Notification = db.define('Notification', {
    id_notification: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dni_type: Sequelize.STRING,
    description: Sequelize.STRING,
    external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
}, {
    timestamps: false
});

Person.hasMany(Notification, { foreignKey: 'id_person' });
Notification.belongsTo(Person, { foreignKey: 'id_person' });

Notification.sync();

module.exports = Notification;