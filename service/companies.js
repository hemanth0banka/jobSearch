const sequelize = require('../util/db.js')
const companies = require('../model/companies.js')
const documents = require('../model/documents.js')
const applies = require('../model/JobApplications.js')
const allCompanies = async (p, items, userId) => {
    try {
        const page = Number(p)
        const offset = (page - 1) * 10
        let obj = {}
        if (items.companyName != '') obj.companyName = items.companyName
        if (items.role != '') obj.role = items.role
        if (items.location != '') obj.location = items.location
        if (items.salary != '') obj.salary = items.salary
        const records = await companies.findAndCountAll({
            where: obj,
            include: {
                model: applies,
                attributes: ['userUserId']
            },
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
        throw e
    }
}
const newJob = async (companyName, role, jobType, location, salary, description, userUserId) => {
    try {
        const record = await companies.create({ companyName, role, jobType, location, salary, description, userUserId })
        return record
    }
    catch (e) {
        console.log(e)
        throw e
    }
}
const companyApply = async (companyId, userId) => {
    try {
        const record = await companies.findOne({
            where: {
                id: companyId
            }
        })
        const document = await documents.findOne({
            where: {
                userUserId: userId
            }
        })
        if (!document) {
            return 'no document found'
        }
        const apply = await applies.create({
            companyName: record.companyName,
            jobTitle: record.role,
            userUserId: userId,
            companyId: companyId,
            documentId: document.id
        })
        return 'applied'
    }
    catch (e) {
        throw e
    }
}
const removepost = async (companyId, userId) => {
    const transaction = await sequelize.transaction()
    try {
        const record = await companies.findOne({
            where: {
                id: companyId
            }
        })
        if (record.userUserId != userId) {
            throw new Error('cant delete post')
        }
        await applies.update({ status: 'post removed' }, {
            where: {
                companyId: record.id
            },
            transaction
        })
        await companies.destroy({
            where: {
                id: companyId
            },
            transaction
        })
        await transaction.commit()
    }
    catch (e) {
        console.log(e)
        await transaction.rollback()
        throw e
    }
}
module.exports = { allCompanies, companyApply, newJob, removepost }