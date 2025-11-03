const service = require('../service/uploads')
const files = async (req, res) => {
    try {
        const userId = req.user.userId
        const r = await service.files(userId)
        res.status(200).send(r)
    }
    catch (e) {
        res.status(500).send(e)
    }
}
const uploadFile = async (req, res) => {
    try {
        const file = req.file
        const { filetype, filename } = req.body
        const userId = req.user.userId
        const url = await service.uploadFile(file.buffer, filetype, filename, userId)
        res.status(200).send(url)
    }
    catch (e) {
        res.status(500).send('Internal Server Error')
    }
}
module.exports = { files, uploadFile }