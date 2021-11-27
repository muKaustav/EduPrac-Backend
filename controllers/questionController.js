const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
const express = require('express')
const mongoose = require('mongoose')
const snarkdown = require('snarkdown')
const question = require('../models/Question')
router = express.Router()

const shuffle = (unshuffled) => {
  return unshuffled.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex')
}

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
  let opt1 = snarkdown(req.body.option1)
  let opt2 = snarkdown(req.body.option2)
  let opt3 = snarkdown(req.body.option3)
  let opt4 = snarkdown(req.body.option4)

  const newData = new Data({
    questionId: sha256(uuidv4()),
    chapterId: req.body.chapterId,
    subjectId: req.body.subjectId,
    difficulty: req.body.difficulty,
    detailedQuestion: qs,
    data: {
      options: {
        option1: opt1,
        option2: opt2,
        option3: opt3,
        option4: opt4,
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

exports.vanilla = (req, res) => {
  const Data = mongoose.model('questions', question)

  Data.find({}, (err, found) => {
    if (err) {
      res.send(err)
    } else {
      let easy = new Array()
      let medium = new Array()
      let difficult = new Array()

      for (let i = 0; i < found.length; i++) {
        if (found[i].difficulty === 'Easy') {
          easy.push(found[i])
        } else if (found[i].difficulty === 'Medium') {
          medium.push(found[i])
        } else {
          difficult.push(found[i])
        }
      }

      let outgoingData = new Set()

      for (let i = 0; i < 10; i++) {
        if (i >= easy.length) break

        let random_easy = Math.floor(Math.random() * easy.length)

        if (outgoingData.has(easy[random_easy])) {
          i--
        } else {
          outgoingData.add(easy[random_easy])
        }
      }

      for (let i = 0; i < 10; i++) {
        if (i >= medium.length) break

        let random_medium = Math.floor(Math.random() * medium.length)

        if (outgoingData.has(medium[random_medium])) {
          i--
        } else {
          outgoingData.add(medium[random_medium])
        }
      }

      for (let i = 0; i < 10; i++) {
        if (i >= difficult.length) break

        let random_difficult = Math.floor(Math.random() * difficult.length)

        if (outgoingData.has(difficult[random_difficult])) {
          i--
        } else {
          outgoingData.add(difficult[random_difficult])
        }
      }

      res.send(shuffle(Array.from(outgoingData)))
    }
  })
}

exports.difficultyDivisionQuery = (req, res) => {
  const Data = mongoose.model('questions', question)

  Data.find({}, (err, found) => {
    if (err) {
      res.send(err)
    } else {
      let easy = new Array()
      let medium = new Array()
      let difficult = new Array()

      for (let i = 0; i < found.length; i++) {
        if (found[i].difficulty === 'Easy') {
          easy.push(found[i])
        } else if (found[i].difficulty === 'Medium') {
          medium.push(found[i])
        } else {
          difficult.push(found[i])
        }
      }

      console.log("E:", easy.length, " M:", medium.length, " D:", difficult.length)
    }
  })
}