const express = require('express');
const router = express.Router();
const propositionController = require('../controllers/PropositionController');


router.get('/', propositionController.getAllPropositions);
router.post('/', propositionController.createProposition);
router.get('/:id', propositionController.getPropositionById);
router.put('/:id', propositionController.updateProposition);
router.delete('/:id', propositionController.deleteProposition);

module.exports = router;
