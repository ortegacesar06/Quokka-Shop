'use strict';
const Role = require('../models/Role');

const RoleController = {};

RoleController.getRoleList = async (req, res) => {
    const roleList = await Role.findAll();
    res.json(roleList);
};

RoleController.saveRole = async (req, res) => {
    await Role.create(req.body);
    res.json({
        msg: 'Role Saved!'
    });
};

RoleController.getRole = async (req, res) => {
    const role = await Role.findOne({
        where: { id_role: req.params.id }
    });
    res.json(role);
};

RoleController.editRole = async (req, res) => {
    await Role.update({
        name: req.body.name
    },{
        where: { id: req.params.id }
    });
    res.json({
        msg: 'Role Updated!'
    });
};

module.exports = RoleController;
