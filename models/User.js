const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: String,
    username: String,
    gender: String,
    email: String,
    photoURL: String,
    role: [{
        name: String
    }],
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

module.exports = UserSchema
