const authentication = require('../authentication/loginAuthentication.js')
const register = require('../authentication/userRegistration.js')
const registration = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body
        const process = await register(username, email, phone, password)
        if (process === 'User Found') {
            res.status(400).send('User already exists with this email')
        }
        else {
            res.status(200).send(process)
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error : ${e}`)
    }
}
const userAuthentication = async (req, res) => {
    try {
        const { email, password } = req.body
        const authenticate = await authentication(email, password)
        if (authenticate === 'Invalid Password') {
            res.status(400).send(authenticate)
        }
        else if (authenticate === "User Not Found") {
            res.status(404).send(authenticate)
        }
        else {
            res.status(200).send(authenticate)
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error : ${e}`)
    }
}

module.exports = { registration, userAuthentication }