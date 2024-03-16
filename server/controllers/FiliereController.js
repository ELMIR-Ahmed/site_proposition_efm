const { Filiere } = require("../models")


const createFiliere = async (req, res) => {
  try {
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
    await Filiere.destroy({ where : {codeFil : codeFil} })
  } catch (error) {
    
  }
}

module.exports = {
  createFiliere,
  getFiliere,
  getFilieres,
  deleteFiliere
}