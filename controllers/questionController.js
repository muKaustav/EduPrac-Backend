const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const express = require('express')
const mongoose = require('mongoose')
const snarkdown = require('snarkdown')
const question = require('../models/question')
router = express.Router()

function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// get all questions
exports.getQuestions = (req, res) => {
  const Data = mongoose.model('questions', question)
  Data.find({}, (err, found) => {
    if (err) {
      res.send(err)
    } else {
      res.send(found)
    }
  })
}

exports.postQuestion = (req, res) => {
  const Data = mongoose.model('questions', question)

  let qs = snarkdown(req.body.detailedQuestion)
  let ans = snarkdown(req.body.detailedAnswer)

  const newData = new Data({
    questionId: sha256(uuidv4()),
    chapterId: req.body.chapterId,
    subjectId: req.body.subjectId,
    difficulty: req.body.difficulty,
    detailedQuestion: qs,
    data: {
      options: {
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
      },
      solutions: {
        book: req.body.book,
        chapterName: req.body.chapterName,
        chapterInfo: req.body.chapterInfo,
        correctOption: req.body.correctOption,
        detailedAnswer: ans,
      },
    },
  })

  newData.save((err) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/admin')
    }
  })
}
