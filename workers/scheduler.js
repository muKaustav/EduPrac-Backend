const cron = require('node-cron')
const mongoose = require('mongoose')
const user = require('../models/user')

let resetDailyObjective = (req, res) => {
    const Data = mongoose.model('users', user)

    Data.find({}, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            data.forEach(user => {
                user.dailyObjective = 0
                user.save()
            })
            res.send("Daily objectives reset.")
        }
    })
}



cron.schedule('48 1 * * *', () => {
    // reset daily objective every day at midnight
    resetDailyObjective()
})