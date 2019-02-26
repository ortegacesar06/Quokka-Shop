'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');

const Tax = db.define('Tax',{
    id_tax:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    percentage: Sequelize.DECIMAL(10,2),
    description: Sequelize.STRING
});

Tax.sync();

module.exports = Tax;
