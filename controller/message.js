const { Chat } = require("../model/Chat")
const Message = require("../model/Message")
const { User } = require("../model/user")


const sendMessage = async (req, res) =>{
    const {chatId, content} = req.body
    
    if (!chatId | !content) {
        res.status(400).send("Invalid data, kindly pass all required data")
    }

    try {
        var newMessage = await Message.create({
            sender : req.user.user_id,
            content,
            chat : chatId
        })
        var  fullMessage = await Message.findById(newMessage._id).populate("sender", "name email gender").populate("chat")
        console.log(fullMessage)
        fullMessage = await User.populate(fullMessage, {
            path: "chat.users",
            select : "name pic email"
        })

        await Chat.findByIdAndUpdate( chatId, {
         latestMessage : fullMessage
        },
        { returnOriginal: false }
        )
        res.status(201).json(fullMessage)
    } catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: error.message
         })

    }
}


const allMessages = async (req, res) => {
   const  chatId = req.params.chatId
   console.log(chatId)
   try {
    const messages = await Message.find({chat : chatId}) .populate("sender", "pic name email")
    .populate("chat")

    res.status(200).json(messages)
   } catch (error) {
    res.status(400).json({
        status: "FAILED",
        message: error.message
     })
   }
}



module.exports = {sendMessage , allMessages}