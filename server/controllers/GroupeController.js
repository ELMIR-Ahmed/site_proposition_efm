const { Groupe } = require('../models'); // Assurez-vous que le chemin d'accès vers le modèle est correct

const groupeController = {
    // Méthode pour créer un nouveau groupe
    async createGroupe(req, res) {
        try {
            const { nomGrp, Filiere_codeFil } = req.body;
            const nouveauGroupe = await Groupe.create({
                "nomGrp" : nomGrp,
                "Filiere_codeFil" : Filiere_codeFil
            });
            res.status(201).json({ message: 'Groupe créé avec succès'});
        } catch (error) {
            console.error('Erreur lors de la création du groupe :', error);
            res.status(500).json({ message: 'Erreur lors de la création du groupe' + error });
        }
    },

    // Méthode pour récupérer tous les groupes
    async getAllGroupes(req, res) {
        try {
            const groupes = await Groupe.findAll();
            res.status(200).json(groupes);
        } catch (error) {
            console.error('Erreur lors de la récupération des groupes :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des groupes' });
        }
    },

    // Méthode pour récupérer un groupe par son ID
    async getGroupeById(req, res) {
        try {
            const { id } = req.params;
            const groupe = await Groupe.findByPk(id);
            if (!groupe) {
                res.status(404).json({ error: 'Groupe non trouvé' });
            } else {
                res.status(200).json(groupe);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération du groupe :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération du groupe' });
        }
    },

    // Méthode pour mettre à jour un groupe
    async updateGroupe(req, res) {
        try {
            const { idGrp } = req.body;
            const { nomGrp, Filiere_codeFil } = req.body;
            const groupe = await Groupe.findByPk(idGrp);
            if (!groupe) {
                res.status(404).json({ message : 'Groupe non trouvé' });
            } else {
                await groupe.update({ "nomGrp" : nomGrp, Filiere_codeFil : Filiere_codeFil });
                res.status(200).json({ message : 'Groupe mis à jour avec succès'});
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du groupe :', error);
            res.status(500).json({ message : 'Erreur lors de la mise à jour du groupe' });
        }
    },

    // Méthode pour supprimer un groupe
    async deleteGroupe(req, res) {
        try {
            const { id } = req.params;
            const groupe = await Groupe.findByPk(id);
            if (!groupe) {
                res.status(404).json({ message : 'Groupe non trouvé' });
            } else {
                await groupe.destroy();
                res.status(200).json({ message: 'Groupe supprimé avec succès' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du groupe :', error);
            res.status(500).json({ message : 'Erreur lors de la suppression du groupe' });
        }
    },

    async deleteGroupes(req, res) {
        try {
            await Groupe.destroy({where : {}});
            res.status(200).json({ message : "Groupes supprimés avec succès !" })
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression du groupe' });
        }
    }
};

module.exports = groupeController;
