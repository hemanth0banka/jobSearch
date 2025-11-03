const express = require('express')
const route = express.Router()
const controller = require('../controller/myJobApplications.js')
route.get('/', controller.applied)
route.put('/', controller.edit)
route.delete('/:id', controller.remove)
module.exports = route