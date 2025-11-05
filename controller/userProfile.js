const users = require('../model/users.js')
const userCarrer = require('../model/userCarrer.js')
const reminders = require('../model/reminders.js')
const jobApplication = require('../model/JobApplications.js')
const documents = require('../model/documents.js')
const companies = require('../model/companies.js')
const userservices = require('../service/userProfile.js')
const user = async (req, res, next) => {
    try {
        const record = await users.findOne({
            where: {
                userId: req.user.userId
            },
            attributes: ['userId', 'username', 'email']
        })
        res.status(200).send(record)
    }
    catch (e) {
        next(e)
    }
}
const userdata = async (req, res, next) => {
    try {
        const userdetails = req.user
        const r = await userservices.userData(userdetails)
        res.status(200).json(r)
    }
    catch (e) {
        if (e.message === 'User not found') {
            const error = new Error('User not found')
            error.statusCode = 404
            return next(error)
        }
        next(e)
    }
}
const userStatus = async (req, res, next) => {
    try {
        const a = await userCarrer.findOne({
            where: { userUserId: req.user.userId }
        })
        const b = await reminders.findAll({
            where: { userUserId: req.user.userId }
        })
        const c = await jobApplication.findAll({
            where: { userUserId: req.user.userId }
        })
        const d = await documents.findOne({
            where: { userUserId: req.user.userId }
        })
        const f = await companies.findAll({
            where: { userUserId: req.user.userId }
        })
        res.status(200).json({
            carrer: a ? true : false,
            reminder: b.length,
            appliedJobs: c.length,
            document: d ? true : false,
            posted: f.length
        })
    }
    catch (e) {
        next(e)
    }
}
const profileUpdate = async (req, res, next) => {
    try {
        const userdetails = req.user
        const { username, email, phone } = req.body
        const r = await userservices.profileUpdate(userdetails, username, email, phone)
        res.status(200).send(r)
    }
    catch (e) {
        if (e.message === 'User not found') {
            const error = new Error('User not found')
            error.statusCode = 404
            return next(error)
        }
        next(e)
    }
}
const getuserCarrer = async (req, res, next) => {
    try {
        const userdetails = req.user
        const u = await userservices.userCarrer(userdetails)
        if (u === 'user not Found') {
            return res.status(200).send(``)
        }
        res.status(200).send(u)
    }
    catch (e) {
        next(e)
    }
}

const carrerUpdate = async (req, res, next) => {
    try {
        const userdetails = req.user
        const { currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade } = req.body
        const r = await userservices.carrerUpdate(userdetails, currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade)
        res.status(200).send(r)
    }
    catch (e) {
        next(e)
    }
}

const deleteAccount = async (req, res, next) => {
    try {
        const { userId } = req.user
        const r = await userservices.deleteAccount(userId)
        res.status(200).send(r)
    }
    catch (e) {
        next(e)
    }
}

module.exports = { user, userdata, userStatus, profileUpdate, carrerUpdate, getuserCarrer, deleteAccount }