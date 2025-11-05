const users = require('../model/users.js')
const bcrypt = require('bcrypt')
const request = require('../model/request.js')
const { v4: uuid } = require('uuid')
const Sib = require('sib-api-v3-sdk');
const LINK_EXPIRY_TIME = 1000 * 60 * 5;
const registration = async (username, email, phone, password) => {
    try {
        const user = await users.findOne({
            where: {
                email
            }
        })
        if (user) return 'User Found'
        const hashed = await bcrypt.hash(password, Number(process.env.salt))
        await users.create({ username, email, phone, password: hashed })
        return 'Registered Successfully'
    }
    catch (e) {
        console.log(e)
        throw e
    }
}

const forgotpassword = async (email) => {
    try {
        const id = uuid()
        const user = await users.findOne({
            where: {
                email
            }
        })
        await request.create({
            url: id,
            userUserId: user.userId
        })
        const link = `http://localhost:1000/user/forgot/${id}`
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.SibapiKey;
        const emailapi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: process.env.SIB_SENDER_EMAIL,
        }
        const receivers = [
            {
                email: email
            }
        ]
        let info = await emailapi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'password Reset Link',
            textContent: `click  this ${link} link to reset your password`
        })
    }
    catch (e) {
        throw e
    }
}

const linkvalidate = async (id) => {
    try {
        const r = await request.findOne({
            where: {
                url: id
            }
        })
        if (r.opened === true) return 'link expired'
        if (new Date(r.created) < new Date(Date.now() - LINK_EXPIRY_TIME)) return 'link expired'
        r.opened = true
        await r.save()
        return 'ok'
    }
    catch (e) {
        throw e
    }
}

const updatePassword = async (id, p) => {
    try {
        const req = await request.findOne({
            where: {
                url: id
            },
            attributes: [],
            include: {
                model: users,
                attributes: ['email']
            }
        })
        const password = await bcrypt.hash(p, 10)
        await users.update({ password }, {
            where: {
                email: req.user.email
            }
        })
        return 'updated'
    }
    catch (e) {
        throw e
    }
}
module.exports = { registration, forgotpassword, linkvalidate, updatePassword }