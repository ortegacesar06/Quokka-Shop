const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/category.controller");

router.get('/', categoryController.getCategoryList)
        .post('/', categoryController.saveCategory);
router.get('/:id', categoryController.getCategory)
        .put('/:id', categoryController.editCategory);

module.exports = router;