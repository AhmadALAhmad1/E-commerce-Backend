const express = require('express');
const router = express.Router();
const subCatController = require('../controllers/subCategory.controller.js');

router.post('/', subCatController.createSubCat);
router.get('/', subCatController.getAllSubCat);
router.get('/:id', subCatController.getSubCat);
router.put('/:id', subCatController.updateSubCat);
router.delete('/:id', subCatController.deleteSubCat);

module.exports = router;
