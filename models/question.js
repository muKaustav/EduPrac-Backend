const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
  questionId: { type: String, unique: true, required: true, dropDups: true },
  chapterId: { type: String, unique: true, required: true, dropDups: true },
  subjectId: { type: String, unique: true, required: true, dropDups: true },
  difficulty: { type: String, unique: true, required: true, dropDups: true },
  detailedQuestion: { type: String, unique: true, required: true, dropDups: true },
  data: {
    options: {
      option1: { type: String, unique: true, required: true, dropDups: true },
      option2: { type: String, unique: true, required: true, dropDups: true },
      option3: { type: String, unique: true, required: true, dropDups: true },
      option4: { type: String, unique: true, required: true, dropDups: true },
    },
    solutions: {
      book: { type: String, unique: true, required: true, dropDups: true },
      chapterName: { type: String, unique: true, required: true, dropDups: true },
      chapterInfo: { type: String, unique: true, required: true, dropDups: true },
      correctOption: { type: String, unique: true, required: true, dropDups: true },
      detailedAnswer: { type: String, unique: true, required: true, dropDups: true },
    },
  },
})

module.exports = questionSchema
