const jobs = require('../model/JobApplications')
const applied = async (userId, p) => {
    try {
        const page = Number(p)
        const offset = (page - 1) * 10
        const records = await jobs.findAndCountAll({
            where: {
                userUserId: userId
            },
            attributes: ['id', 'companyName', 'jobTitle', 'status', 'notes'],
            limit: 10,
            offset
        })
        return {
            total: records.count,
            previous: page - 1,
            current: page,
            next: page + 1,
            last: Math.ceil(records.count / 10),
            records
        }
    }
    catch (e) {
        console.log(e)
        throw e
    }
}
const editNote = async (id, data) => {
    try {
        const record = await jobs.update({ notes: data }, {
            where: { id }
        })
        if (!record) {
            throw new Error('no record found')
        }
        return 'updated'
    }
    catch (e) {
        throw e
    }
}
const removeApplication = async (id) => {
    try {
        const record = await jobs.destroy({
            where: {
                id : id
            }
        })
        if (!record) {
            throw new Error('no record found')
        }
        return 'removed'
    }
    catch (e) {
        throw e
    }
}
module.exports = { applied, removeApplication, editNote }