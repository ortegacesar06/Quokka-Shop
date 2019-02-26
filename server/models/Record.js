'use strict';
const Sequelize = require('sequelize');
const  db = require('../database');
const Person = require('./Person');

const Record = db.define('Record', {
    id_record: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    action: Sequelize.STRING(10),
    description: Sequelize.STRING,
    reference: Sequelize.STRING
});

Person.hasMany(Record, { foreignKey: 'id_person' });
Record.belongsTo(Person, { foreignKey: 'id_person' });

Record.sync();

module.exports = Record;