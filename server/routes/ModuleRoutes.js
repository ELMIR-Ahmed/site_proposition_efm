const express = require("express")

const router = express.Router()

const ModuleController = require('../controllers/ModuleController')


router.get('/:codeModule', ModuleController.getModule)
router.get('/', ModuleController.getModules)
router.post('/', ModuleController.createModule)
router.delete('/:codeModule', ModuleController.deleteModule)
router.delete('/', ModuleController.deleteModules)

module.exports = router