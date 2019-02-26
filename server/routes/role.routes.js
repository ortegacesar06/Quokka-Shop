const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role.controller');

router.get('/', roleController.getRoleList)
        .post('/', roleController.saveRole);
router.get('/:id', roleController.getRole)
        .put('/:id', roleController.editRole);

module.exports = router;