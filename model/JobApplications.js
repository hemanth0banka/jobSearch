const {DataTypes} = require('sequelize')
const sequelize = require('../util/db.js')
const applied = sequelize.define('applies',{
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    companyName : {
        type : DataTypes.STRING,
        allowNull : false
    },
    jobTitle : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type : DataTypes.STRING,
        defaultValue : 'applied'
    },
    notes : {
        type : DataTypes.STRING,
        allowNull : true
    }
})
module.exports = applied