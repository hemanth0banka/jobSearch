const service = require('../service/myJobApplications.js')
const applied = async (req, res, next) => {
    try {
        const { userId } = req.user
        const page = req.query.page
        const records = await service.applied(userId, page)
        res.status(200).send(records)
    }
    catch (e) {
        next(e)
    }
}
const edit = async (req, res, next) => {
    try {
        const { id, data } = req.body
        const r = await service.editNote(id, data)
        res.status(200).send('updated')
    }
    catch (e) {
        next(e)
    }
}
const remove = async (req, res, next) => {
    try {
        const id = req.params.id
        const msg = await service.removeApplication(id)
        if (msg === 'removed') {
            res.status(200).send(msg)
        }
    }
    catch (e) {
        next(e)
    }
}
module.exports = { applied, remove, edit }