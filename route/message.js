const express = require("express")
const { sendMessage, allMessages } = require("../controller/message")
const verifyToken = require("../middleware/auth")


const router = express.Router()

 

router.post("/",  verifyToken, sendMessage )
router.get("/:chatId", verifyToken , allMessages)


module.exports = {router }