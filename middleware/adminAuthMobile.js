const mongoose = require('mongoose')
const user = require('../models/User')

const checkAdminLoggedInMobile = (req, res, next) => {
    const Data = mongoose.model('users', user)

    Data.findOne({
        userId: req.headers.userid,
        role: 'ADMIN'
    }, (err, user) => {
        if (err) {
            res.sendStatus(401)
        } else {
            next()
        }
    })
}

module.exports = checkAdminLoggedInMobile