const reminder = require('../model/reminders.js')
const newReminder = async (date, note, jobId, userId) => {
    try {
        const record = await reminder.create({
            time: new Date(date).toISOString(), note: note, userUserId: userId, applyId: jobId
        })
        return record
    }
    catch (e) {
        throw e
    }
}
const removeReminder = async (id) => {
    try {
        const record = await reminder.destroy({
            where: {
                id
            }
        })
        return record
    }
    catch (e) {
        throw e
    }
}
module.exports = { newReminder, removeReminder }