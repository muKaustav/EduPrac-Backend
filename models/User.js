const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: { type: String, unique: true, required: true, dropDups: true },
    username: { type: String, unique: true, required: true, dropDups: true },
    email: { type: String, unique: true, required: true, dropDups: true },
    photoURL: String,
    role: { type: String, unique: true, required: true, dropDups: true },
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
