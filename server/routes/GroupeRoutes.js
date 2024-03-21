const express = require('express');
const router = express.Router();
const groupeController = require('../controllers/GroupeController');

// Route pour créer un nouveau groupe
router.post('/groupes', groupeController.createGroupe);

// Route pour récupérer tous les groupes
router.get('/groupes', groupeController.getAllGroupes);

// Route pour récupérer un groupe par son ID
router.get('/groupes/:id', groupeController.getGroupeById);

// Route pour mettre à jour un groupe
router.put('/groupes/:id', groupeController.updateGroupe);

// Route pour supprimer un groupe
router.delete('/groupes/:id', groupeController.deleteGroupe);

module.exports = router;
