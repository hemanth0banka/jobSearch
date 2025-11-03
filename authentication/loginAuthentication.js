const users = require('../model/users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginAuthentication = async (email, password) => {
    try {
        const user = await users.findOne({
            where: {
                email : email
            }
        });
        if(!user) return "User Not Found"
        const decode = await bcrypt.compare(password, user.password);
        if (!decode) return "Invalid Password"
        const token = jwt.sign({ userId: user.userId, username: user.username, email: user.email }, process.env.securitykey);
        return token
    }
    catch (e) {
        throw e
    }
}
module.exports = loginAuthentication