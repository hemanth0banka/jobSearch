const users = require('../model/users.js')
const userservices = require('../service/userProfile.js')
const user = async (req, res) => {
    try {
        const record = await users.findOne({
            where: {
                userId: req.user.userId
            },
            attributes: ['userId', 'username']
        })
        res.status(200).send(record)
    }
    catch (e) {
        res.status(500).send(`Internal server Error`)
    }
}
const userdata = async (req, res) => {
    try {
        const userdetails = req.user
        const r = await userservices.userData(userdetails)
        res.status(200).json(r)
    }
    catch (e) {
        if (e.message === 'User not found') {
            return res.status(404).send('User not found');
        }
        res.status(500).send('Internal Server Error');
    }
}
const profileUpdate = async (req, res) => {
    try {
        const userdetails = req.user
        const { username, email, phone } = req.body
        const r = await userservices.profileUpdate(userdetails, username, email, phone)
        res.status(200).send(r)
    }
    catch (e) {
        if (e.message === 'User not found') {
            return res.status(404).send('User not found');
        }
        res.status(500).send('Internal Server Error')
    }
}
const getuserCarrer = async (req, res) => {
    try {
        const userdetails = req.user
        const u = await userservices.userCarrer(userdetails)
        if (u === 'user not Found') {
            return res.status(200).send(``)
        }
        res.status(200).send(u)
    }
    catch (e) {
        res.status(500).send(e)
    }
}

const carrerUpdate = async (req, res) => {
    try {
        const userdetails = req.user
        const { currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade } = req.body
        const r = await userservices.carrerUpdate(userdetails, currentRole, desireRole, skills, experienceYears, education, schoolGrade, InterGrade, bachelorGrade, postGrade)
        res.status(200).send(r)
    }
    catch (e) {
        res.status(500).send(e)
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.user
        const r = await userservices.deleteAccount(userId)
        res.status(200).send(r)
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
}

module.exports = { user, userdata, profileUpdate, carrerUpdate, getuserCarrer ,deleteAccount}