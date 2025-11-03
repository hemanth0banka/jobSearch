const { DataTypes } = require('sequelize')
const sequelize = require('../util/db.js')
const carrer = sequelize.define('carrer', {
    currentRole: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desireRole: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skills: {
        type: DataTypes.STRING,
        allowNull: false
    },
    experienceYears: {
        type: DataTypes.INTEGER
    },
    education: {
        type: DataTypes.STRING
    },
    schoolGrade: {
        type: DataTypes.INTEGER
    },
    InterGrade: {
        type: DataTypes.INTEGER
    },
    bachelorGrade: {
        type: DataTypes.INTEGER
    },
    postGrade: {
        type: DataTypes.INTEGER
    }
})
module.exports = carrer