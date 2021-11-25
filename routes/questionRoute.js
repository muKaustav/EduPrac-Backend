const express = require("express")
const questionRoute = require("../controllers/questionController")
const checkAdminLoggedIn = require("../middleware/adminAuth")

router = express.Router()

router.get("/questions", checkAdminLoggedIn, questionRoute.getQuestions)
router.get("/temp", questionRoute.getQuestions)
router.get("/query", questionRoute.difficultyDivisionQuery)
router.post("/questions", checkAdminLoggedIn, questionRoute.postQuestion)

module.exports = router
