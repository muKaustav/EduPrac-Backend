const express = require("express")
const userRoute = require("../controllers/userController")
const checkUserLoggedIn = require("../middleware/userAuth")
const checkAdminLoggedIn = require("../middleware/adminAuth")

router = express.Router()

router.get("/users", checkAdminLoggedIn, userRoute.getUsers)
router.post("/user", userRoute.postUser)
router.post("/userQuestion", checkUserLoggedIn, userRoute.postUserQuestion)
router.get("/getDaily", checkUserLoggedIn, userRoute.getDaily)
router.post("/addBookmark", checkUserLoggedIn, userRoute.addBookmark)
router.post("/removeBookmark", checkUserLoggedIn, userRoute.removeBookmark)

module.exports = router