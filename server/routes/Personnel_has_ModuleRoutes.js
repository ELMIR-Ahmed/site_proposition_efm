const express = require('express');
const router = express.Router();
const Personnel_has_ModuleController = require('../controllers/Personnel_has_ModuleController')


router.post('/', Personnel_has_ModuleController.createAssignment);
router.get('/:CIN', Personnel_has_ModuleController.getAssignmentsByPersonnel);
router.put('/:CIN', Personnel_has_ModuleController.updateAssignment);
router.delete('/:CIN', Personnel_has_ModuleController.deleteAssignment);

module.exports = router;