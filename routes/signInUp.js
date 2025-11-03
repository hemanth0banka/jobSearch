const express = require('express')
const route = express.Router()
const control = require('../controller/signInUp')
route.post('/register', control.registration)
route.post('/login', control.userAuthentication)
module.exports = route