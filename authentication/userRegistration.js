const users = require('../model/users.js')
const bcrypt = require('bcrypt')
const registration = async (username, email, phone, password) => {
    try {
        const user = await users.findOne({
            where: {
                email
            }
        })
        if (user) return 'User Found'
        const hashed = await bcrypt.hash(password, 10)
        await users.create({ username, email, phone, password: hashed })
        return 'Registered Successfully'
    }
    catch (e) {
        console.log(e)
        throw e
    }
}
module.exports = registration