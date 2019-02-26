'use strict';
const Sequelize = require('sequelize');

const sequelize = new Sequelize('dapsk9p2hue5a5', 'glmhrflygedhgv', '70d97e870ef1715bc6f954b60568d03f15a8df3390481c3bf16baceb63bc6554', {
    host: 'ec2-107-20-185-27.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    operatorsAliases: false
});

sequelize.
    authenticate()
    .then(() => { console.log('DB is connected') })
    .catch((err) => { console.error('Unable to connect to the database:'); });

module.exports = sequelize;