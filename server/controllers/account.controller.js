
'use strict';
const Sequelize = require('sequelize');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');

const AccountController = {};
/**
 * @api {get} / Permite listar Cuentas
 * @apiName getAccountList
 * @apiGroup AccountController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {accounts} Devuelve una lista de cuentas.
 * 
 */
AccountController.getAccountList = (req, res) => {
    Account.findAll()
    .then((accounts) =>{
        res.status(200).send(accounts); })
    .catch((err) =>{
        res.status(500).send(err);
    });
};
/**
 * @api {post} / Permite Guardar Cuentas
 * @apiName saveAccount
 * @apiGroup AccountController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * 
 * 
 */
AccountController.saveAccount = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    Account.create(req.body)
    .then(() =>{
        res.status(201).send(); })
    .catch((err) => {
        res.status(500).send(err);
    });
};
/**
 * @api {get} / Permite listar obtener cuenta por por el id
 * @apiName getAccount
 * @apiGroup AccountController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {account} Devuelve una cuenta
 * 
 */
AccountController.getAccount = (req, res) => {
    Account.findOne({
        where: { id_account: req.params.id }
    }).then((account) => {
        account = account.toJSON();
        delete account.id_account;
        delete account.createdAt;
        delete account.updatedAt;
        delete account.id_person;
        res.status(200).send(account); })
    .catch((err) => {
        res.status(500).send();
    });
};
/**
 * @api {put} / Permite editar una cuenta
 * @apiName editAccount
 * @apiGroup AccountController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * 
 */
AccountController.editAccount = (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    Account.update({
        password: req.body.password,
        email: req.body.email,
        secure_token: req.body.secure_token,
        phone_number: req.body.phone_number,
        state: req.body.state,
        updatedAt: Sequelize.NOW
    },{
        where: { id_account: req.params.id }
    }).then(() => {
        res.status(200).send(); })
    .catch((err) => {
        res.status(500).send(err);
    });
};

module.exports = AccountController;