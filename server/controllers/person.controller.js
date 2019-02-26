'use strict';
const Person = require('../models/Person');
const Role = require('../models/Role');
const Account = require('../models/Account');
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const PersonController = {};

PersonController.getPersonList = async (req, res) => {
    const personList = await Person.findAll({where: {id_role: 4}, include: [{model: Account}], order: [
        [Sequelize.col('id_person'), 'DESC']
    ] });
    res.json(personList);
};

PersonController.search = async (req, res) => {
    const personSearch = await Person.findAll(
        { where: { 
            id_role: 4, 
            first_name: req.body.search, 
            last_name: req.body.search, 
            dni: req.body.search 
        }
    });
    res.json(personSearch);
};

PersonController.savePerson = (req, res) => {
    Account.findOne({ where: { user_name: req.body.user_name }}).then(function (account) {
        if(account){
            res.json({
                msg: 'Repeated User Name!'
            });
        } else {
            Person.create(req.body)
            .then( function(newPerson, created) {
                if(newPerson) {
                    req.body.password = bcrypt.hashSync(req.body.password, 8);
                    Account.create({
                        user_name: req.body.user_name,
                        email: req.body.email,
                        password: req.body.password,
                        secure_token: req.body.secure_token,
                        phone_number: req.body.phone_number,
                        id_person: newPerson.id_person
                    })
                    .then(() => {
                        res.status(201).json();
                    })
                    .catch((err) => {
                        res.status(500).json(err);
                    });
                };
            });
            res.json({
                msg: 'Person Saved!'
            });
        }
    });    
};

PersonController.getPerson = async (req, res) => {
    const person = await Person.findOne({
        where: { dni: req.params.dni }
    });
    res.json(person);
};

PersonController.getPersonAccount = async (req, res) => {
    const person = await Person.findOne({
        where: { dni: req.params.dni }
    });
    res.json(await person.getAccount());
};

PersonController.getPersonRole = async (req, res) => {
    const person = await Person.findOne({
        where: { dni: req.params.dni }
    });
    res.json(await person.getRole());
};

PersonController.editPerson = async (req, res) => {
    await Person.update({
        dni_type: req.body.dni_type,
        dni: req.body.dni,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        postal_code: req.body.postal_code
    },
    { where: { dni: req.params.dni } });
    res.json({
        msg: 'Person Updated!'
    });
};

PersonController.savePersonAdmin = (req, res) => {
    Person.create(req.body)
    .then(() => {
    });
    res.json({
        msg: 'Person Saved!'
    });    
};

module.exports = PersonController;