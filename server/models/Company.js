'use strict';
const Sequelize = require('sequelize');
const db = require('../database');

const Company = db.define('Company', {
    id_company:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(100),
    country: Sequelize.STRING(70),
    city: Sequelize.STRING(70),
    address: Sequelize.STRING
});

Company.sync();

module.exports = Company;