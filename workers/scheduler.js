const cron = require('node-cron')
const mongoose = require('mongoose')
const user = require('../models/User')

module.exports = () => {
    cron.schedule('0 0 * * *', () => {
        // reset daily objective every day at midnight
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

        console.log("Daily Objective Reset")
    })
}