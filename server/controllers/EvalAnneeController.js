const { EvalAnnee } = require('../models'); // Assurez-vous que le chemin d'accès vers le modèle est correct

const evalAnneeController = {
    // Méthode pour créer une nouvelle évaluation annuelle
    async createEvalAnnee(req, res) {
        try {
            // Création d'une nouvelle instance d'évaluation annuelle avec les données du corps de la requête
            const nouvelleEvalAnnee = await EvalAnnee.create(req.body);
            // Réponse avec un message de succès et les détails de l'évaluation annuelle créée
            res.status(201).json({ message: 'Évaluation annuelle créée avec succès', evalAnnee: nouvelleEvalAnnee });
        } catch (error) {
            // Gestion des erreurs lors de la création de l'évaluation annuelle
            console.error('Erreur lors de la création de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la création de l\'évaluation annuelle' });
        }
    },

    // Méthode pour récupérer toutes les évaluations annuelles
    async getAllEvalAnnees(req, res) {
        try {
            // Récupération de toutes les évaluations annuelles depuis la base de données
            const evalAnnees = await EvalAnnee.findAll();
            // Réponse avec la liste des évaluations annuelles
            res.status(200).json(evalAnnees);
        } catch (error) {   
            // Gestion des erreurs lors de la récupération des évaluations annuelles
            console.error('Erreur lors de la récupération des évaluations annuelles :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des évaluations annuelles' });
        }
    },

    // Méthode pour récupérer une évaluation annuelle par son ID
    async getEvalAnneeById(req, res) {
        try {
            // Récupération de l'ID de l'évaluation annuelle à partir des paramètres de la requête
            const { id } = req.params;
            // Recherche de l'évaluation annuelle par son ID
            const evalAnnee = await EvalAnnee.findByPk(id);
            // Vérification si l'évaluation annuelle est trouvée ou non
            if (!evalAnnee) {
                // Réponse avec un message d'erreur si l'évaluation annuelle n'est pas trouvée
                res.status(404).json({ error: 'Évaluation annuelle non trouvée' });
            } else {
                // Réponse avec les détails de l'évaluation annuelle si elle est trouvée
                res.status(200).json(evalAnnee);
            }
        } catch (error) {
            // Gestion des erreurs lors de la récupération de l'évaluation annuelle par son ID
            console.error('Erreur lors de la récupération de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'évaluation annuelle' });
        }
    },

    // Méthode pour mettre à jour une évaluation annuelle
    async updateEvalAnnee(req, res) {
        try {
            // Récupération de l'ID de l'évaluation annuelle à partir des paramètres de la requête
            const { id } = req.params;
            // Recherche de l'évaluation annuelle par son ID
            const evalAnnee = await EvalAnnee.findByPk(id);
            // Vérification si l'évaluation annuelle est trouvée ou non
            if (!evalAnnee) {
                // Réponse avec un message d'erreur si l'évaluation annuelle n'est pas trouvée
                res.status(404).json({ error: 'Évaluation annuelle non trouvée' });
            } else {
                // Mise à jour de l'évaluation annuelle avec les données du corps de la requête
                await evalAnnee.update(req.body);
                // Réponse avec un message de succès et les détails de l'évaluation annuelle mise à jour
                res.status(200).json({ message: 'Évaluation annuelle mise à jour avec succès', evalAnnee });
            }
        } catch (error) {
            // Gestion des erreurs lors de la mise à jour de l'évaluation annuelle
            console.error('Erreur lors de la mise à jour de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'évaluation annuelle' });
        }
    },

    // Méthode pour supprimer une évaluation annuelle
    async deleteEvalAnnee(req, res) {
        try {
            // Récupération de l'ID de l'évaluation annuelle à partir des paramètres de la requête
            const { id } = req.params;
            // Recherche de l'évaluation annuelle par son ID
            const evalAnnee = await EvalAnnee.findByPk(id);
            // Vérification si l'évaluation annuelle est trouvée ou non
            if (!evalAnnee) {
                // Réponse avec un message d'erreur si l'évaluation annuelle n'est pas trouvée
                res.status(404).json({ error: 'Évaluation annuelle non trouvée' });
            } else {
                // Suppression de l'évaluation annuelle
                await evalAnnee.destroy();
                // Réponse avec un message de succès
                res.status(200).json({ message: 'Évaluation annuelle supprimée avec succès' });
            }
        } catch (error) {
            // Gestion des erreurs lors de la suppression de l'évaluation annuelle
            console.error('Erreur lors de la suppression de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'évaluation annuelle' });
        }
    }
};

module.exports = evalAnneeController;
