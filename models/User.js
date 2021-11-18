const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    photoURL: String,
    role: { type: String, required: true },
    questions: {
        bookmarkedQuestions: [{ uuid: String }],
        attemptedQuestions: [{
            uuid: String,
            difficulty: String,
            ease: String,
            current_lvl: String,
            attempts: [{
                date: String,
                accessibleOn: String
            }]
        }]
    }
})

module.exports = userSchema
