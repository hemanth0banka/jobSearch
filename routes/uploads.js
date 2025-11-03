const express = require('express')
const route = express.Router()
const controller = require('../controller/uploads.js')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
route.get('/', controller.files)
route.post('/', upload.single('filedata'), controller.uploadFile)
module.exports = route