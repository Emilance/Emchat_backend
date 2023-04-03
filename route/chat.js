const express = require("express")
const {  accessChat, groupChat, removeUserToGroup, addUserToGroup } = require("../controller/chat")
const verifyToken = require("../middleware/auth")


const router = express.Router()

 

router.post("/",  verifyToken, accessChat )
router.post("/group", verifyToken, groupChat)
router.put("/remove",  verifyToken, removeUserToGroup )
router.put("/add", verifyToken, addUserToGroup)

module.exports = {router }