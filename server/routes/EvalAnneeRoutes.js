const express = require('express');
const router = express.Router();
const evalAnneeController = require('../controllers/EvalAnneeController');



router.post('/', evalAnneeController.createEvalAnnee);
router.get('/', evalAnneeController.getAllEvalAnnees);
router.get('/:id', evalAnneeController.getEvalAnneeById);
router.put('/:id', evalAnneeController.updateEvalAnnee);
router.delete('/:id', evalAnneeController.deleteEvalAnnee);

module.exports = router;
