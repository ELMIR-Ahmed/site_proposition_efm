const { canTreatArrayAsAnd } = require("sequelize/lib/utils")
const { Module, Filiere, Personnel_has_Module } = require("../models")


const createModule = async (req, res) => {
  try {
    const {Filiere_codeFil} = req.body
    const filiere = await Filiere.findByPk(Filiere_codeFil)
    if (!filiere) {
      return res.status(400).json({ message : "Filière afféctée n'existe pas !" })
    }
    await Module.create(req.body)
    res.status(201).json({ message : "Module créé avec succès !" })
  } catch (error) {
    res.status(500).json({ message : 'Une erreur est survenue lors de la création du module.' })
  }
}


const getModule = async (req, res) => {
  try {
    const {codeModule} = req.params
    const module = await Module.findByPk(codeModule)
    if (!module) {
      return res.status(400).json({ message : "Module non trouvé !" })
    }
    res.json(module)
  } catch (error) {
    res.status(500).json({ message : 'Une erreur est survenue lors de la récupération du module.' })  }
}

const getModules = async (req, res) => {
  try {
    const modules = await Module.findAll()
    if (!modules) {
      return res.status(400).json({ message : 'Aucun module n\'est trouvé !' })
    }
    res.json(modules)
  } catch (error) {
    res.status(500).json({ message : "une erreur est survenue lors de la récupération des modules." })
  }
}

const deleteModule = async (req, res) => {
  try {
    const {codeModule} = req.params
    const module = await Module.findByPk(codeModule)
    if (!module) {
      return res.status(400).json({ message : `Le module ${codeModule} n'existe pas !` })
    }
    const personnelhasModule = await Personnel_has_Module.findOne({ where : { Module_codeModule : codeModule } })
    if (personnelhasModule) {
      await Personnel_has_Module.destroy({ where : { Module_codeModule : codeModule } })
    }
    await Module.destroy({ where : { codeModule : codeModule} })
    res.status(200).json({ message : "Module supprimé avec succès ! " })
  } catch (error) {
    res.status(500).json({ message : "une erreur est survenue lors de la suppression du module. => " + error })
  }
}

const deleteModules = async (req, res) => {
  try {
    const destroyment = await Module.destroy({where : {}})
    if (destroyment) {
      return res.status(200).json({message : "Modules supprimés avec succès !"})
    }
  } catch (error) {
    return res.status(400).json({message : "une erreur est survenue lors de la suppression des modules !"})
  }
}

const updateModule = async (req, res) => {
  try {
    const { codeModule } = req.body
    const modulea = await Module.findByPk(codeModule)
    if( !modulea ) {
      return res.status(400).json({message : 'module non trouvé !'})
    } else {
      await modulea.update(req.body)
      res.status(200).json({message : 'Module modifié avec succès !'})
    }
  } catch (error) {
    res.status(500).json({message : 'Une erreur est survenue lors de la modification du module !' + error})
  }
}

module.exports = {
  createModule,
  getModule,
  getModules,
  deleteModule,
  deleteModules,
  updateModule
}