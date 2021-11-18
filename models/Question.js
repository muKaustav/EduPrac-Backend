const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  questionId: { type: String, unique: true, required: true, dropDups: true },
  chapterId: { type: String, required: true },
  subjectId: { type: String, required: true },
  difficulty: { type: String, required: true },
  detailedQuestion: { type: String, required: true },
  data: {
    options: {
      option1: { type: String, required: true },
      option2: { type: String, required: true },
      option3: { type: String, required: true },
      option4: { type: String, required: true },
    },
    solutions: {
      book: { type: String, required: true, },
      chapterName: { type: String, required: true },
      chapterInfo: { type: String, required: true },
      correctOption: { type: String, required: true },
      detailedAnswer: { type: String, required: true },
    },
  }
})

module.exports = questionSchema
