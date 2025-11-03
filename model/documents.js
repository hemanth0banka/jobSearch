const { DataTypes } = require('sequelize')
const sequelize = require('../util/db.js')
const documents = sequelize.define('documents', {
    resume: {
        type: DataTypes.STRING,
        allowNull: true
    },
    coverLetter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    others: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
module.exports = documents