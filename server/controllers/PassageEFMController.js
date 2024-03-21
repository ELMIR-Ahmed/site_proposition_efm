const { PassageEFM } = require('../models');

const passageEFMController = {
    // Méthode pour créer un nouveau passage EFM
    async createPassageEFM(req, res) {
        try {
            const nouveauPassageEFM = await PassageEFM.create(req.body);
            res.status(201).json({ message: 'Passage EFM créé avec succès', passageEFM: nouveauPassageEFM });
        } catch (error) {
            console.error('Erreur lors de la création du passage EFM :', error);
            res.status(500).json({ error: 'Erreur lors de la création du passage EFM' });
        }
    },

    // Méthode pour récupérer tous les passages EFM
    async getAllPassagesEFM(req, res) {
        try {
            const passagesEFM = await PassageEFM.findAll();
            res.status(200).json(passagesEFM);
        } catch (error) {
            console.error('Erreur lors de la récupération des passages EFM :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des passages EFM' });
        }
    },

    // Méthode pour récupérer un passage EFM par son ID
    async getPassageEFMById(req, res) {
        try {
            const { id } = req.params;
            const passageEFM = await PassageEFM.findByPk(id);
            if (!passageEFM) {
                res.status(404).json({ error: 'Passage EFM non trouvé' });
            } else {
                res.status(200).json(passageEFM);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du passage EFM :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du passage EFM' });
        }
    },

    // Méthode pour mettre à jour un passage EFM
    async updatePassageEFM(req, res) {
        try {
            const { id } = req.params;
            const passageEFM = await PassageEFM.findByPk(id);
            if (!passageEFM) {
                res.status(404).json({ error: 'Passage EFM non trouvé' });
            } else {
                await passageEFM.update(req.body);
                res.status(200).json({ message: 'Passage EFM mis à jour avec succès', passageEFM });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du passage EFM :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour du passage EFM' });
        }
    },

    // Méthode pour supprimer un passage EFM
    async deletePassageEFM(req, res) {
        try {
            const { id } = req.params;
            const passageEFM = await PassageEFM.findByPk(id);
            if (!passageEFM) {
                res.status(404).json({ error: 'Passage EFM non trouvé' });
            } else {
                await passageEFM.destroy();
                res.status(200).json({ message: 'Passage EFM supprimé avec succès' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du passage EFM :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression du passage EFM' });
        }
    }
};

module.exports = passageEFMController;
