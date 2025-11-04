const service = require('../service/uploads')
const files = async (req, res,next) => {
    try {
        const userId = req.user.userId
        const r = await service.files(userId)
        res.status(200).send(r)
    }
    catch (e) {
        next(e)
    }
}
const uploadFile = async (req, res,next) => {
    try {
        const file = req.file
        const { filetype, filename } = req.body
        const userId = req.user.userId
        const url = await service.uploadFile(file.buffer, filetype, filename, userId)
        res.status(200).send(url)
    }
    catch (e) {
        next(e)
    }
}
module.exports = { files, uploadFile }