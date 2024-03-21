const express = require('express');
const router = express.Router();
const propositionController = require('../controllers/PropositionController');


router.post('/propositions', propositionController.createProposition);
router.get('/propositions', propositionController.getAllPropositions);
router.get('/propositions/:id', propositionController.getPropositionById);
router.put('/propositions/:id', propositionController.updateProposition);
router.delete('/propositions/:id', propositionController.deleteProposition);

module.exports = router;
