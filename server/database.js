'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false
});

sequelize.
    authenticate()
    .then(() => { console.log('DB is connected') })
    .catch((err) => { console.error('Unable to connect to the database:'); });

module.exports = sequelize;