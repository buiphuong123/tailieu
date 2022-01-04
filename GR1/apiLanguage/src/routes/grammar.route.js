const express = require('express')
const router = express.Router()
const grammarController = require('../controllers/grammar.controller');

router.get('/subKanji', grammarController.subKanji)
router.post('/createGrammar', grammarController.createGrammar)
router.post('/getGrammar', grammarController.getGrammar)
router.post('/createExample', grammarController.createExample)
router.post('/GrammarofId', grammarController.GrammarofId)
router.post('/createMemGrammar', grammarController.createMemGrammar)

module.exports = router