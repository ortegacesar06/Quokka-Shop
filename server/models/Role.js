const Sequelize = require('sequelize');
const  db = require('../database');

const Role = db.define('Role', {
    id_role: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING(20)        
}, {
    timestamps: false
});

Role.sync();

module.exports = Role;