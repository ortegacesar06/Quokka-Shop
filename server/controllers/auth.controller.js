'use strict';
const Account = require('../models/Account');
const Person = require('../models/Person');
const Role = require('../models/Role');

const bcrypt = require('bcryptjs');

const AuthController = {};
/**
 * @api {get} / Permite obtener una sesion
 * @apiName getSession
 * @apiGroup AuthController 
 *
 * @apiParam {req, res} permiten realizar la peticiones y devoluciones de repuesta 
 *
 * @apiSuccess {account} Devuelve una sesion
 */
AuthController.getSession = (username, password, done) => {
    Account.findOne({
        where: { user_name: username }, include: [
            { model: Person, required: true }
        ]
    }).then((account) =>{
        if(!account) return done(null, false);
        if(!bcrypt.compareSync(password, account.password)) return done(null, false);     
        return done(null, account);  
    }).catch((err) => {
        console.log(err);
        return done(err);
    })
}

module.exports = AuthController;