const services = require('../service/companies.js')
const allCompanies = async (req, res) => {
    try {
        const page = req.query.page
        const obj = req.body
        const records = await services.allCompanies(page, obj, req.user.userId)
        res.status(200).send(records)
    }
    catch (e) {
        res.status(500).send('Internal Server Error')
    }
}
const newJob = async (req, res) => {
    try {
        const { companyName, role, jobType, location, salary, description } = req.body
        const record = await services.newJob(companyName, role, jobType, location, salary, description, req.user.userId)
        if (!record) {
            return res.status(500).send('something went wrong')
        }
        return res.status(200).send('success')
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal server Error', e)
    }
}
const apply = async (req, res) => {
    try {
        const { userId } = req.user
        const { companyId } = req.body
        const record = await services.companyApply(companyId, userId)
        if (record === 'no document found') {
            return res.status(404).send('no document found')
        }
        res.status(200).send('Applied')
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
}
const removepost = async (req, res) => {
    try {
        const { userId } = req.user
        const { id } = req.params
        const r = await services.removepost(id, userId)
        if (r === 'cant delete post') {
            return res.status(400).send(r)
        }
        res.status(200).send('success')
    }
    catch (e) {
        res.status(500).send('Internal Server Error')
    }
}
module.exports = { allCompanies, apply, newJob, removepost }