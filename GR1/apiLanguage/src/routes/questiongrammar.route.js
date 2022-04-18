const express = require('express')
const router = express.Router()
const questiongrammarController = require('../controllers/questiongrammar.controller');

router.post('/getQuestion', questiongrammarController.getQuestion)
router.post('/createQuestion', questiongrammarController.createQuestion)
router.post('/createResult', questiongrammarController.createResult)
router.post('/getResult', questiongrammarController.getResult)
router.post('/readImage', questiongrammarController.readImage)
router.get('/image', questiongrammarController.image)

module.exports = router