const express = require('express');
const router = express.Router();
const passageEFMController = require('../controllers/PassageEFMController');


router.post('/passages-efm', passageEFMController.createPassageEFM);
router.get('/passages-efm', passageEFMController.getAllPassagesEFM);
router.get('/passages-efm/:id', passageEFMController.getPassageEFMById);
router.put('/passages-efm/:id', passageEFMController.updatePassageEFM);
router.delete('/passages-efm/:id', passageEFMController.deletePassageEFM);

module.exports = router;
