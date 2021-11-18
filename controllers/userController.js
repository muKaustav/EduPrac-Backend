const express = require('express')
const mongoose = require('mongoose')
const user = require('../models/User')
router = express.Router()

exports.getUsers = (req, res) => {
    const Data = mongoose.model('users', user)
    Data.find({}, (err, found) => {
        if (err) {
            res.send(err)
        } else {
            res.send(found)
        }
    })
}

exports.postUser = (req, res) => {
    const Data = mongoose.model('users', user)

    const newUser = new Data({
        userId: req.body.userId,
        username: req.body.username,
        email: req.body.email,
        photoURL: req.body.photoURL,
        role: req.body.role,
        questions: {
            bookmarkedQuestions: [],
            attemptedQuestions: []
        }
    })

    newUser.save((err, saved) => {
        if (err) {
            res.send(err)
        } else {
            res.send(saved)
        }
    })
}

exports.postUserQuestion = async (req, res) => {
    const Data = mongoose.model('users', user)

    let doc = await Data.findOne({ userId: req.headers.userid })

    doc.questions.bookmarkedQuestions.push({ "uuid": req.body.questions.bookmarkedQuestions[0]['uuid'] })
    doc.questions.attemptedQuestions.push({
        "uuid": req.body.questions.attemptedQuestions[0]['uuid'],
        "difficulty": req.body.questions.attemptedQuestions[0]['difficulty'],
        "ease": req.body.questions.attemptedQuestions[0]['ease'],
        "current_lvl": req.body.questions.attemptedQuestions[0]['current_lvl'],
        "attempts": [{
            "date": +new Date,
            "accessibleOn": req.body.questions.attemptedQuestions[0]['attempts'][0]['accessibleOn']
        }]
    })

    doc.save((err, saved) => {
        if (err) {
            res.send(err)
        } else {
            res.send(saved)
        }
    })
}
