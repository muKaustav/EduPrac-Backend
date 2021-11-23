const cron = require('cron')
const mongoose = require('mongoose')
const user = require('../models/User')

module.exports = () => {
    let job = new cron.CronJob('00 00 00 * * *', () => {
        const Data = mongoose.model('users', user)

        Data.find({}, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                data.forEach(user => {
                    user.dailyObjective = 0
                    user.save()
                })
            }
        })

        let date = new Date()
        console.log("Daily Objective Reset: ", date.toLocaleString())
    }, null, true, 'Asia/Kolkata')
}