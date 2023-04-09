const express = require("express")
const { signUp, login, getUser } = require("../controller/user")
const verifyToken = require("../middleware/auth")


const router = express.Router()

router.post("/signup",  signUp )
router.post("/login",  login )
router.get("/", verifyToken, getUser )


module.exports = {router }