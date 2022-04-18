const express = require('express')
const router = express.Router()
const scheduleController = require('../controllers/schedule.controller');

router.post('/remind', scheduleController.remind)


module.exports = router