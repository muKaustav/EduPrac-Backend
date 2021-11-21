const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    photoURL: String,
    role: { type: String, required: true },
    dailyObjective: Number,
    questions: {
        bookmarkedQuestions: [{ uuid: String }],
        attemptedQuestions: [{
            uuid: String,
            difficulty: String,
            ease: String,
            current_lvl: String,
            attempts: [{
                date: Date,
                accessibleOn: Date
            }]
        }]
    }
})

module.exports = userSchema
