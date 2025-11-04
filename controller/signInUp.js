const authentication = require('../authentication/loginAuthentication.js')
const register = require('../authentication/userRegistration.js')
const registration = async (req, res, next) => {
    try {
        const { username, email, phone, password } = req.body
        const process = await register(username, email, phone, password)
        if (process === 'User Found') {
            const error = new Error('User already exists with this email')
            error.statusCode = 400
            return next(error)
        }
        else {
            res.status(200).send(process)
        }
    }
    catch (e) {
        next(e)
    }
}
const userAuthentication = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const authenticate = await authentication(email, password)
        if (authenticate === 'Invalid Password') {
            const error = new Error(authenticate)
            error.statusCode = 400
            return next(error)
        }
        else if (authenticate === "User Not Found") {
            const error = new Error(authenticate)
            error.statusCode = 404
            return next(error)
        }
        res.status(200).send(authenticate)
    }
    catch (e) {
        next(e)
    }
}

module.exports = { registration, userAuthentication }