require("dotenv").config()
const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const user = require('./models/User')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.LOCAL_CALLBACK_URL
},
    (accessToken, refreshToken, profile, cb) => {
        const Data = mongoose.model('users', user)

        Data.findOne({ userId: profile.id, role: 'ADMIN' }, (err, found) => {
            if (err) {
                cb(err)
            } else {
                cb(null, found)

            }
        })
    }
))