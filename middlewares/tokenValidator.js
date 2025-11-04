const jwt = require('jsonwebtoken')
const validate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).send('token is missing')
        }
        const decoded = jwt.verify(token, process.env.securitykey)
        req.user = decoded
        next()
    }
    catch (e) {
        const error = new Error('Invalid token')
        error.statusCode = 401
        next(error)
    }
}
module.exports = { validate }