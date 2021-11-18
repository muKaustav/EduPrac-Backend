const express = require("express")
const questionRoute = require("../controllers/questionController")

router = express.Router()

const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}

router.get("/questions", checkUserLoggedIn, questionRoute.getQuestions)
router.post("/questions", questionRoute.postQuestion)

module.exports = router
