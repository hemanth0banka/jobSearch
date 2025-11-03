const express = require('express')
const route = express.Router()
const controller = require('../controller/companies.js')
route.post('/', controller.allCompanies)
route.put('/apply', controller.apply)
route.post('/new', controller.newJob)
route.delete('/:id',controller.removepost)
module.exports = route