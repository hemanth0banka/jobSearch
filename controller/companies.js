const services = require('../service/companies.js')
const allCompanies = async (req, res, next) => {
    try {
        const page = req.query.page
        const obj = req.body
        const records = await services.allCompanies(page, obj, req.user.userId)
        res.status(200).send(records)
    }
    catch (e) {
        next(e)
    }
}
const newJob = async (req, res, next) => {
    try {
        const { companyName, role, jobType, location, salary, description } = req.body
        const record = await services.newJob(companyName, role, jobType, location, salary, description, req.user.userId)
        if (!record) {
            const error = new Error('invalid data')
            error.status = 400
            return next(error)
        }
        return res.status(200).send('success')
    }
    catch (e) {
        next(e)
    }
}
const apply = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { companyId } = req.body
        const record = await services.companyApply(companyId, userId)
        if (record === 'no document found') {
            const error = new Error('no document found')
            error.statusCode = 404
            return next(error)
        }
        res.status(200).send('Applied')
    }
    catch (e) {
        next(e)
    }
}
const removepost = async (req, res, next) => {
    try {
        const { userId } = req.user
        const { id } = req.params
        const r = await services.removepost(id, userId)
        if (r === 'cant delete post') {
            const error = new Error(r)
            error.statusCode = 400
            return next(error)
        }
        res.status(200).send('success')
    }
    catch (e) {
        next(e)
    }
}
module.exports = { allCompanies, apply, newJob, removepost }