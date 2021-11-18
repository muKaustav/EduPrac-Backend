const express = require("express")
const passport = require('passport')

router = express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/links')
    }
)

router.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

module.exports = router