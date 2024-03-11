const express = require('express');

const router = express.Router();

const personnelController = require('../controllers/PersonnelController');

router.get('/personnel/:CIN', personnelController.getPersonnelByCIN);
router.get('/personnel', personnelController.getAllPersonnel);
router.post('/createPersonnel', personnelController.createPersonnel);
router.delete('/deletePersonnel/:CIN', personnelController.deletePersonnel);
router.put('/updatePersonnel/:CIN', personnelController.updatePersonnel);

module.exports = router; 