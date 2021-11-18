const mongoose = require('mongoose')
const user = require('../models/User')

const checkUserLoggedIn = (req, res, next) => {
    const Data = mongoose.model('users', user)

    Data.find({ userId: req.headers.userId }, (err, found) => {
        if (err) {
            res.send(err)
        } else {
            if (found) {
                next()
            } else {
                res.send('User not found')
            }
        }
    })
}

module.exports = checkUserLoggedIn