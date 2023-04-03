const mongoose  = require("mongoose")
const Schema  = mongoose.Schema


const ChatSchema = Schema({
    chatName : {
        type: String
    },
    lastMessage :{
        type : Schema.Types.ObjectId,
        ref: "Message"
    },
    users :[
        {
          type :Schema.Types.ObjectId,
          ref : "User"
        }
    ],
    isGroup : {
        type:Boolean
    },
    groupAdmin : {
        type :Schema.Types.ObjectId,
        ref : "User"
    }
},
{
    timestamps : true
});

const Chat = mongoose.model("Chat", ChatSchema)
module.exports = {Chat} 