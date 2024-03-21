const FiliereController = require("../controllers/FiliereController")
const express = require("express")
const router = express.Router()

router.get('/:codeFil', FiliereController.getFiliere)
router.get('/', FiliereController.getFilieres)
router.post('/', FiliereController.createFiliere)
router.delete('/:codeFil', FiliereController.deleteFiliere)

module.exports = router