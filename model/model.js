const users = require('../model/users.js')
const carrer = require('./userCarrer.js')
const applications = require('./JobApplications.js')
const companies = require('../model/companies.js')
const documents = require('../model/documents.js')
const reminders = require('../model/reminders.js')

users.hasOne(carrer)
carrer.belongsTo(users)

users.hasMany(applications)
applications.belongsTo(users)

users.hasMany(companies)
companies.belongsTo(users)

companies.hasMany(applications)
applications.belongsTo(companies)

documents.hasMany(applications)
applications.belongsTo(documents)

users.hasOne(documents)
documents.belongsTo(users)

users.hasMany(reminders)
reminders.belongsTo(users)

applications.hasMany(reminders)
reminders.belongsTo(applications)

module.exports = { users, carrer, applications, companies, documents }