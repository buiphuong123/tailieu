const express = require('express')
const router = express.Router()
const wordController = require('../controllers/word.controller.js');
router.post('/getWord', wordController.getWord)
router.post('/createMemWord', wordController.createMemWord)
router.post('/createLikeWord', wordController.createLikeWord)

module.exports = router