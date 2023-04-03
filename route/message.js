const express = require("express")
const { sendMessage } = require("../controller/message")
const verifyToken = require("../middleware/auth")


const router = express.Router()

 

router.post("/",  verifyToken, sendMessage )
router.post("/", verifyToken)


module.exports = {router }