const express = require("express")
const userRoute = require("../controllers/userController")

router = express.Router()

const checkUserLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401)
}

router.get("/users", checkUserLoggedIn, userRoute.getUsers)
router.post("/user", userRoute.postUser)
router.post("/userQuestions", userRoute.postUserQuestions)

module.exports = router
