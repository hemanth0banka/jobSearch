const cron = require('node-cron')
const reminders = require('../model/reminders.js')
const users = require('../model/users.js')
const Sib = require('sib-api-v3-sdk');
const job = async () => {
    console.log('Sending Reminders')
    try {
        const records = await reminders.findAll({
            where: {
                sent: false
            }
        })
        for (let x of records) {
            if (new Date(x.time) <= new Date(Date.now())) {
                const user = await users.findOne({
                    where: {
                        userId: x.userUserId
                    }
                })
                const client = Sib.ApiClient.instance;
                const apiKey = client.authentications['api-key'];
                apiKey.apiKey = process.env.SibapiKey;
                const emailapi = new Sib.TransactionalEmailsApi()

                const sender = {
                    email: process.env.SIB_SENDER_EMAIL,
                }
                const receivers = [
                    {
                        email: user.email
                    }
                ]
                let info = await emailapi.sendTransacEmail({
                    sender,
                    to: receivers,
                    subject: 'Job Application Reminder',
                    textContent: x.note
                })
                x.sent = true
                await x.save()
            }
        }

    }
    catch (e) {
        console.log(e)
    }
    console.log('Sending Reminders Ended')
}
cron.schedule('0 2 * * *', job)