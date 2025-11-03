const { DataTypes } = require('sequelize')
const sequelize = require('../util/db.js')
const reminders = sequelize.define('reminders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    time: {
        type: DataTypes.STRING
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})
module.exports = reminders