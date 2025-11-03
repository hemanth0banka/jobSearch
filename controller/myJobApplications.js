const service = require('../service/myJobApplications.js')
const applied = async (req, res) => {
    try {
        const { userId } = req.user
        const page = req.query.page
        const records = await service.applied(userId, page)
        res.status(200).send(records)
    }
    catch (e) {
        res.status(500).send('Internal Server Error')
    }
}
const edit = async (req, res) => {
    try {
        const { id, data } = req.body
        const r = await service.editNote(id, data)
        res.status(200).send('updated')
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
}
const remove = async (req, res) => {
    try {
        const id = req.params.id
        const msg = await service.removeApplication(id)
        if (msg === 'removed') {
            res.status(200).send(msg)
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
}
module.exports = { applied, remove, edit }