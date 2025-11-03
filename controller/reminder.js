const service = require('../service/reminder.js')
const reminder = require('../model/reminders.js')
const reminders = async (req, res) => {
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
        res.status(500).send('Internal Server Error')
    }
}
const newReminder = async (req, res) => {
    try {
        const { date, note, jobId } = req.body
        const { userId } = req.user
        const record = await service.newReminder(date, note, jobId, userId)
        res.status(200).send('Reminder created')
    }
    catch (e) {
        res.status(500).send('Internal server Error')
    }
}
const removeReminder = async (req, res) => {
    try {
        const id = req.query.id
        const record = await service.removeReminder(id)
        res.status(200).send('removed')
    }
    catch (e) {
        console.log(e)
        res.status(500).send('Internal Server Error')
    }
}
module.exports = { newReminder, removeReminder, reminders }