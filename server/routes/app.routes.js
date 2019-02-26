const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/*router.get('/dashboard/category', (req, res) => {
    res.render('index', { req });
});

router.get('/dashboard/preferences', (req, res) => {
    res.render('index', { req });
});*/

router.get('/dashboard', (req, res) => {
    res.render('index', { req });
});

router.get('/dashboard/*', (req, res) => {
    res.render('index', { req });
});

router.get('/login', (req, res) => {
    res.render('index', { req });
});
router.get('/register-person', (req, res) => {
    res.render('index', { req });
});

router.get('/', (req, res) => {
    res.render('index', { req });
});

module.exports = router;