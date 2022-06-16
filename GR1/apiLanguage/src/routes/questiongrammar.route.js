const express = require('express')
const router = express.Router()
const questiongrammarController = require('../controllers/questiongrammar.controller');

router.post('/getQuestion', questiongrammarController.getQuestion)
router.post('/createQuestion', questiongrammarController.createQuestion)
router.post('/createResult', questiongrammarController.createResult)
router.post('/getResult', questiongrammarController.getResult)
router.post('/readImage', questiongrammarController.readImage)
router.get('/image', questiongrammarController.image)
router.post('/readImage1', questiongrammarController.readImage1)
router.get('/getQuestionLevellession', questiongrammarController.getQuestionLevellession)
router.get('/changeType', questiongrammarController.changeType)
router.get('/getAllQuestionGrammar', questiongrammarController.getAllQuestionGrammar)

module.exports = router