'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Person = require('./Person');

const Account = db.define('Account', {
    id_account: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: Sequelize.STRING(100),
    email: Sequelize.STRING(100),
    password: Sequelize.STRING,
    secure_token: Sequelize.STRING,
    phone_number: Sequelize.STRING(20),
    state: { type: Sequelize.BOOLEAN, defaultValue: true },
    image_path: { type: Sequelize.STRING, defaultValue: 'userdefault.jpg' },
    external_id: { type: Sequelize.STRING, defaultValue: Sequelize.UUIDV4 }
});

Person.hasOne(Account, { foreignKey: 'id_person' });
Account.belongsTo(Person, { foreignKey: 'id_person' });

Account.sync();

module.exports = Account;