const mongoose  = require("mongoose")
const Schema  = mongoose.Schema

const MessageSchema = Schema({
    sender : {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content : {
        type: String
    },
    chat : {
        type: Schema.Types.ObjectId
    }
},
{
    timestamps: true
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message