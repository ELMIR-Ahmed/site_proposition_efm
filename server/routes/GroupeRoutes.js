const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/GroupeController');

// Route pour créer un nouveau groupe
router.post('/', groupeController.createGroupe);

// Route pour récupérer tous les groupes
router.get('/', groupeController.getAllGroupes);

// Route pour récupérer un groupe par son ID
router.get('/:id', groupeController.getGroupeById);

// Route pour mettre à jour un groupe
router.put('/:id', groupeController.updateGroupe);

// Route pour supprimer un groupe
router.delete('/:id', groupeController.deleteGroupe);

// Route pour supprimer un groupe
router.delete('/', groupeController.deleteGroupes);

module.exports = router;
