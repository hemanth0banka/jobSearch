const express = require('express')
const route = express.Router()
const controller = require('../controller/reminder.js')
route.get('/',controller.reminders)
route.post('/create', controller.newReminder)
route.delete('/remove', controller.removeReminder)
module.exports = route