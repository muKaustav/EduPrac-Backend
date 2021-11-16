const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  questionId: String,
  chapterId: String,
  subjectId: String,
  difficulty: String,
  data: {
    options: {
      option1: String,
      option2: String,
      option3: String,
      option4: String,
    },
    solutions: {
      book: String,
      chapterName: String,
      chapterInfo: String,
      correctOption: String,
      detailedAnswer: String,
    },
  },
})

module.exports = questionSchema
