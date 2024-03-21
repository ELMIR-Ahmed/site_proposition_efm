const express = require('express');
const router = express.Router();
const evalAnneeController = require('../controllers/EvalAnneeController');



router.post('/evaluations', evalAnneeController.createEvalAnnee);
router.get('/evaluations', evalAnneeController.getAllEvalAnnees);
router.get('/evaluations/:id', evalAnneeController.getEvalAnneeById);
router.put('/evaluations/:id', evalAnneeController.updateEvalAnnee);
router.delete('/evaluations/:id', evalAnneeController.deleteEvalAnnee);

module.exports = router;
