const express = require('express')
const router = express.Router()
const wordController = require('../controllers/word.controller.js');
router.post('/getWord', wordController.getWord)
router.post('/createMemWord', wordController.createMemWord)
router.post('/createLikeWord', wordController.createLikeWord)
router.post('/createWordComment', wordController.createWordComment)
router.post('/createWord', wordController.createWord)
router.get('/getAllWord', wordController.getAllWord)
router.get('/testfind', wordController.testfind)
router.get('/testData', wordController.testData)
router.get('/wordQuestionTest', wordController.wordQuestionTest)
router.get('/dataWord', wordController.dataWord)

module.exports = router