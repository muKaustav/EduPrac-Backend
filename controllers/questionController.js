const express = require("express");
const mongoose = require("mongoose");
const question = require("../models/question");

router = express.Router();

// get all questions
exports.getQuestions = (req, res) => {
  const Data = mongoose.model("questions", question);
  Data.find({}, (err, found) => {
    if (err) {
      res.send(err);
    } else {
      res.send(found);
    }
  });
};

exports.postQuestion = (req, res) => {
  const Data = mongoose.model("questions", question);

  //   res.send(req.body.data[0]["solutions"]);
  //   console.log(req.body.option1);

  const newData = new Data({
    questionId: req.body.questionId,
    chapterId: req.body.chapterId,
    subjectId: req.body.subjectId,
    difficulty: req.body.difficulty,
    data: {
      options: {
        option1: req.body.data["options"]["option1"],
        option2: req.body.data["options"]["option2"],
        option3: req.body.data["options"]["option3"],
        option4: req.body.data["options"]["option4"],
      },

      solutions: {
        book: req.body.data["solutions"]["book"],
        chapterName: req.body.data["solutions"]["chapterName"],
        chapterInfo: req.body.data["solutions"]["chapterInfo"],
        correctOption: req.body.data["solutions"]["correctOption"],
        detailedAnswer: req.body.data["solutions"]["detailedAnswer"],
      },
    },
  });

  newData.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Data added successfully!");
    }
  });
};
