// controllers/personnelController.js

const { Personnel } = require('../models');

// Middleware pour créer un nouveau personnel
const createPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.create(req.body);
        res.status(201).json({ message: 'Personnel créé avec succes.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du personnel.' });
    }
}

// Middleware pour récupérer tous les personnels
const getAllPersonnel = async (req, res) => {
    try {
        const personnels = await Personnel.findAll();
        res.json(personnels); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des personnels.' });
    }
}

// Middleware pour récupérer un personnel par son CIN
const getPersonnelByCIN = async (req, res) => {
    try {
        const personnel = await Personnel.findByPk(req.params.CIN);
        if (!personnel) {
            return res.status(404).json({ message: 'Personnel non trouvé.' });
        }
        res.json(personnel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du personnel.' });
    }
}

// Middleware pour mettre à jour un personnel
const updatePersonnel = async (req, res) => {
    try {
        const [updated] = await Personnel.update(req.body, {
            where: { CIN: req.params.CIN }
        });
        if (updated) {
            // const updatedPersonnel = await Personnel.findByPk(req.params.CIN);
            return res.json({ message: 'Personnel modifié avec succes.' });
        }
        throw new Error('Personnel non trouvé.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du personnel.' });
    }
}

// Middleware pour supprimer un personnel
const deletePersonnel = async (req, res) => {
    try {
        const deleted = await Personnel.destroy({
            where: { CIN: req.params.CIN }
        });
        if (deleted) {
            return res.json({ message: 'Personnel supprimé avec succès.' });
        }
        throw new Error('Personnel non trouvé.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du personnel.' });
    }
}

module.exports = {
    createPersonnel,
    getAllPersonnel,
    getPersonnelByCIN,
    updatePersonnel,
    deletePersonnel
};
