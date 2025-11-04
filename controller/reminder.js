const service = require('../service/reminder.js')
const reminder = require('../model/reminders.js')
const reminders = async (req, res,next) => {
    try {
        const records = await reminder.findAll({
            where: {
                useruserId: req.user.userId
            },
            attributes: ['id', 'time', 'note']
        })
        res.status(200).send(records)
    }
    catch (e) {
        next(e)
    }
}
const newReminder = async (req, res,next) => {
    try {
        const { date, note, jobId } = req.body
        const { userId } = req.user
        const record = await service.newReminder(date, note, jobId, userId)
        res.status(200).send('Reminder created')
    }
    catch (e) {
        next(e)
    }
}
const removeReminder = async (req, res,next) => {
    try {
        const id = req.query.id
        const record = await service.removeReminder(id)
        res.status(200).send('removed')
    }
    catch (e) {
        next(e)
    }
}
module.exports = { newReminder, removeReminder, reminders }