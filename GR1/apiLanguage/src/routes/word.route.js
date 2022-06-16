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
router.get('/getNameWord', wordController.getNameWord)
router.get('/dataExample', wordController.dataExample)
router.post('/dataQuestionWord', wordController.dataQuestionWord)
router.get('/setLessionWord', wordController.setLessionWord)
router.get('/testRamdom', wordController.testRamdom)
router.get('/checkStringJapan', wordController.checkStringJapan)
router.post('/deleteWord', wordController.deleteWord)
router.post('/accpetComment', wordController.accpetComment)
router.post('/refuseComment', wordController.refuseComment)
router.get('/numberWord', wordController.numberWord)
router.get('/lessionWord', wordController.lessionWord)


router.get('/testttt', wordController.testttt)

module.exports = router