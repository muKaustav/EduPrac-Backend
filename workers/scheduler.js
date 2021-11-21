const cron = require('node-cron')
const mongoose = require('mongoose')
const user = require('../models/user')

let resetDailyObjective = () => {
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
}

cron.schedule('46 1 * * *', () => {
    // reset daily objective every day at midnight
    resetDailyObjective()
})