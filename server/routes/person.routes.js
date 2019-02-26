const express = require('express');
const router = express.Router();

const personController = require('../controllers/person.controller');

router.get('/', personController.getPersonList)
        .post('/', personController.savePerson);
router.get('/:dni', personController.getPerson)
        .put('/:dni', personController.editPerson);

router.get('/account/:dni', personController.getPersonAccount);
router.get('/role/:dni', personController.getPersonRole);
router.post('/admin', personController.savePersonAdmin );
router.post('/search', personController.search);


module.exports = router;