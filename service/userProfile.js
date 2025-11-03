const users = require('../model/users.js')
const reminders = require('../model/reminders.js')
const jobApplication = require('../model/JobApplications.js')
const documents = require('../model/documents.js')
const companies = require('../model/companies.js')
const carrergoals = require('../model/userCarrer.js')
const sequelize = require('../util/db.js')

const userData = async (user) => {
    try {
        const record = await users.findOne({
            where: {
                userId: user.userId
            },
            attributes: {
                exclude: ['password']
            }
        })
        if (!record) {
            throw new Error('User not found');
        }
        return record
    }
    catch (e) {
        throw e
    }
}
const profileUpdate = async (user, username, email, phone) => {
    try {
        const record = await users.update({ username, email, phone },
            {
                where: {
                    userId: user.userId
                }
            })
        return 'updated successfully'
    }
    catch (e) {
        throw e
    }
}

const carrerUpdate = async (user, currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade) => {
    try {
        const [record] = await carrergoals.update({ currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade }, {
            where: {
                userUserId: user.userId
            }
        })
        if (record === 0) {
            const record = await carrergoals.create({ currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade, userUserId: user.userId })
            return 'sucess'
        }
        return 'updated Successfully'
    }
    catch (e) {
        throw e
    }
}
const userCarrer = async (user) => {
    try {
        const record = await carrergoals.findOne({
            where: {
                userUserId: user.userId
            }
        })
        if (!record) return ('user not Found')
        return record
    }
    catch (e) {
        throw e
    }
}
const deleteAccount = async (userId) => {
    const transaction = await sequelize.transaction()
    try {
        await reminders.destroy({
            where: {
                userUserId: userId
            },
            transaction
        })
        await jobApplication.destroy({
            where: {
                userUserId: userId
            },
            transaction
        })
        await documents.destroy({
            where: {
                userUserId: userId
            },
            transaction
        })
        await companies.destroy({
            where: {
                userUserId: userId
            },
            transaction
        })
        await carrergoals.destroy({
            where: {
                userUserId: userId
            },
            transaction
        })
        await users.destroy({
            where: {
                userId: userId
            },
            transaction
        })
        await transaction.commit()
        return 'ok'
    }
    catch (e) {
        await transaction.rollback()
        throw e
    }
}
module.exports = { userData, profileUpdate, carrerUpdate, userCarrer, deleteAccount }