const express = require('express');

const router = express.Router();

const personnelController = require('../controllers/PersonnelController');

router.get('/:CIN', personnelController.getPersonnelByCIN);
router.get('/', personnelController.getAllPersonnel);
router.post('/', personnelController.createPersonnel);
router.delete('/:CIN', personnelController.deletePersonnel);
router.delete('/', personnelController.deleteAllPersonnel);
router.put('/', personnelController.updatePersonnel);

module.exports = router; 