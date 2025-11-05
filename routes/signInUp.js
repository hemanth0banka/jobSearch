const express = require('express')
const route = express.Router()
const control = require('../controller/signInUp')
route.post('/register', control.registration)
route.post('/login', control.userAuthentication)
route.post('/forgot',control.forgotpassword)
route.get('/forgot/:id',control.linkvalidation)
route.put('/forgot/:id',control.updatePassword)
module.exports = route