const { EvalAnnee } = require('../models');

const evalAnneeController = {
    async createEvalAnnee(req, res) {
        try {
            await EvalAnnee.create(req.body);
            return res.status(201).json({ message: 'Évaluation annuelle créée avec succès' });
        } catch (error) {
            console.error('Erreur lors de la création de l\'évaluation annuelle :', error);
            res.status(500).json({ message : 'Erreur lors de la création de l\'évaluation annuelle', error });
        }
    },

    async getAllEvalAnnees(req, res) {
        try {
            const evalAnnees = await EvalAnnee.findAll();
            res.status(200).json(evalAnnees);
        } catch (error) {   
            console.error('Erreur lors de la récupération des évaluations annuelles :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des évaluations annuelles' });
        }
    },

    async getEvalAnneeById(req, res) {
        try {
            const { id } = req.params;
            const evalAnnee = await EvalAnnee.findByPk(id);
            if (!evalAnnee) {
                res.status(404).json({ error: 'Évaluation annuelle non trouvée' });
            } else {
                res.status(200).json(evalAnnee);
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération de l\'évaluation annuelle' });
        }
    },

    async updateEvalAnnee(req, res) {
        try {
            const { Module_codeModule } = req.body;
            const evalAnnee = await EvalAnnee.findOne({where : {Module_codeModule : Module_codeModule}});
            if (!evalAnnee) {
                res.status(404).json({ error: 'Évaluation annuelle non trouvée' });
            } else {
                await evalAnnee.update(req.body);
                res.status(200).json({ message: 'Évaluation annuelle mise à jour avec succès' });
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'évaluation annuelle :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'évaluation annuelle' });
        }
    },

    async deleteEvalAnnee(req, res) {
        try {
            const { Module_codeModule } = req.params;
            const evalAnnee = await EvalAnnee.findOne({where : {Module_codeModule : Module_codeModule}});
            if (!evalAnnee) {
                res.status(404).json({ message : 'Évaluation annuelle non trouvée' });
            } else {
                await evalAnnee.destroy();
                res.status(200).json({ message: 'Évaluation annuelle supprimée avec succès' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'évaluation annuelle' });
        }
    }
};

module.exports = evalAnneeController;
