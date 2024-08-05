const { Proposition } = require('../models'); // Assurez-vous que le chemin d'accès vers le modèle est correct

const propositionController = {
  // Méthode pour créer une nouvelle proposition
    async createProposition(req, res) {
        try {
        const { dateEnvoi, Module_codeModule, Personnel_CIN } = req.body;
        console.log('Received data:', req);

        const proposition = await Proposition.create({
            dateEnvoi,
            Module_codeModule,
            Personnel_CIN
        });

        res.status(201).json({ message: 'Proposition créée avec succès', proposition });
        } catch (error) {
        console.error('Erreur lors de la création de la proposition:', error);
        res.status(500).json({ message: 'Erreur interne du serveur', error });
        }
    },

    // Méthode pour récupérer toutes les propositions
    async getAllPropositions(req, res) {
        try {
        const propositions = await Proposition.findAll();
        res.status(200).json(propositions);
        } catch (error) {
        console.error('Erreur lors de la récupération des propositions:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des propositions' });
        }
    },

    // Méthode pour récupérer une proposition par son ID
    async getPropositionById(req, res) {
        try {
        const { id } = req.params;
        const proposition = await Proposition.findByPk(id);
        if (!proposition) {
            return res.status(404).json({ error: 'Proposition non trouvée' });
        }
        res.status(200).json(proposition);
        } catch (error) {
        console.error('Erreur lors de la récupération de la proposition:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la proposition' });
        }
    },

    // Méthode pour mettre à jour une proposition
    async updateProposition(req, res) {
        try {
        const { id } = req.params;
        const proposition = await Proposition.findByPk(id);
        if (!proposition) {
            return res.status(404).json({ error: 'Proposition non trouvée' });
        }
        await proposition.update(req.body);
        res.status(200).json({ message: 'Proposition mise à jour avec succès', proposition });
        } catch (error) {
        console.error('Erreur lors de la mise à jour de la proposition:', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la proposition' });
        }
    },

    // Méthode pour supprimer une proposition
    async deleteProposition(req, res) {
        try {
        const { id } = req.params;
        const proposition = await Proposition.findByPk(id);
        if (!proposition) {
            return res.status(404).json({ error: 'Proposition non trouvée' });
        }
        await proposition.destroy();
        res.status(200).json({ message: 'Proposition supprimée avec succès' });
        } catch (error) {
        console.error('Erreur lors de la suppression de la proposition:', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de la proposition' });
        }
    }
};

module.exports = propositionController;
