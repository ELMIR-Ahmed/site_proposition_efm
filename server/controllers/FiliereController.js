const { Filiere } = require("../models")
const { Module } = require("../models")
const { Groupe } = require("../models")


const createFiliere = async (req, res) => {
  try {
    const newFiliere = req.body
    if (!newFiliere.codeFil || !newFiliere.nomFil || !newFiliere.anneeFil) {
      return res.status(400).json({ message : "Veuillez remplir les champs !" })
    }
    await Filiere.create(req.body)
    res.status(200).json({ message : "Filière créée avec succès !" })
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du Filière.' });
  }
}


const getFiliere = async (req, res) => {
  try {
    const { codeFil } = req.params
    const filiere = await Filiere.findByPk(codeFil)
    if (!filiere) {
      return res.status(400).json({ message : "Filière non trouvée !" })
    }
    res.json(filiere)
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la Filiere.' });
  }
}

const getFilieres = async (req, res) => {
  try {
    const filiere = await Filiere.findAll()
    if (!filiere) {
      return res.status(400).json({ message : " Aucune filière n'est trouvée !" })
    }
    res.json(filiere)
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des Filieres.' });
  }
}


const deleteFiliere = async (req, res) => {
  try {
    const { codeFil } = req.params
    const filiere = await Filiere.findByPk(codeFil)
    if (!filiere) {
      return res.status(400).json({ message : "Filière non trouvée !" })
    }
    const filiereInGroupe = await Groupe.findOne({where : {Filiere_codeFil : codeFil}})
    const filiereInModule = await Module.findOne({where : {Filiere_codeFil : codeFil}})
    if (filiereInGroupe && filiereInModule) {
      return res.status(400).json({ message : "Filière est afféctée au modules et groupes !" })
    }
    if(filiereInModule) {
      return res.status(400).json({ message : "Filière est afféctée au modules !" })
    }
    if(filiereInGroupe) {
      return res.status(400).json({ message : "Filière est afféctée au groupes !" })
    }
    await Filiere.destroy({ where : {codeFil : codeFil} })
    res.status(200).json({ message : "Filière supprimée avec succès !" })
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la Suppresion de Filiere.' });
  }
}


const deleteAllFilieres = async (req, res) => {
  try {
    await Filiere.destroy({where : {}})
    return res.status(200).json({ message : "Filières supprimées avec succès !" })
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression des Filieres.' + error });
  }
}

module.exports = {
  createFiliere,
  getFiliere,
  getFilieres,
  deleteFiliere,
  deleteAllFilieres
}