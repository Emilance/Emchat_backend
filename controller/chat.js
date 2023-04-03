const { Chat } = require("../model/Chat")
const { User } = require("../model/user")



const accessChat = async (req, res)=>{
    const {chatName, userId} = req.body
    if (!userId) {
        return res.status(400).send("Cannot create a chat without userId")
    }
   
    var existingChat = await Chat.find({
        isGroup : false,
        $and : [{users : {$elemMatch :{ $eq :  req.user.user_id }}},
            {users : {$elemMatch :{ $eq :  userId}}}]
    }).populate("users", "-password")
    .populate("lastMessage")

     existingChat =  await User.populate(existingChat,{
        path: "latestMessage.sender",
        select: "name pic email"
     })


     if (existingChat.length > 0) {
        res.status(200).json({
            existingChat :existingChat[0]
        })
     } else {
        try {
            const newChat = await Chat.create({
                isGroup : false,
                chatName : "sender",
                users : [ req.user.user_id, userId]
             })
             const completeChat = await Chat.findOne({_id : newChat._id}).populate("users", "-password")

             res.status(201).json(completeChat )
        } catch (error) {
            res.status(400).json({
                status: "FAILED",
                message: error.message
             })
        }

     }
}


const groupChat = async (req, res) => {
    const {chatName, users} = req.body
    if (!chatName || ! users) {
        res.status(400).send("kindly fill all required field")
    } 
    userArr = JSON.parse(users)
    if (userArr.length < 2) {
        return res.status(400).send("more than two users are needed to form a group")
    }
    userArr.push(req.user.user_id)

    try {
        
        const newGroupChat = await Chat.create({
            chatName,
            isGroup : true,
            users : userArr,
            groupAdmin : req.user.user_id
        })
    
        const fullGroupChat  = await Chat.findById(newGroupChat._id).populate("users" , "-password")
         .populate("groupAdmin", "-password")
        res.status(201).json(fullGroupChat)
    } catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: error.message
         })
    }
}

const addUserToGroup = async (req, res) => {
    const {chatId, userId} = req.body

    const updatedgroup = await Chat.findByIdAndUpdate(chatId, 
       {
         $push : {users : userId }
       }, {new: true})
       .populate("users" , "-password")
         .populate("groupAdmin", "-password")

    if (!updatedgroup) {
        res.status(404).send("chat not found")
    } else {
        res.status(200).json(updatedgroup)
    }
}

const removeUserToGroup = async (req, res) => {
    const {chatId, userId} = req.body

    const updatedgroup = await Chat.findByIdAndUpdate(chatId, 
       {
         $pull : {users : userId }
       }, {new: true})
       .populate("users" , "-password")
         .populate("groupAdmin", "-password")

    if (!updatedgroup) {
        res.status(404).send("chat not found")
    } else {
        res.status(200).json(updatedgroup)
    }
}


module.exports = {accessChat, groupChat, removeUserToGroup , addUserToGroup}