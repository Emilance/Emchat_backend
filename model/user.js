const  mongoose = require("mongoose")

const Schema = mongoose.Schema


const userSchema =  Schema({
    name:{
        type: String,
        required: true,
    },
  
    email : {
        type:String,
        required : true
    },
    gender : {
         type: String,
         enum : ["male", "female"]
    },
    chat: [{
        type:Schema.Types.ObjectId,
        ref: "Chat"
    }],
    password : {
        type:String
    },
    pic : {
        type:String,
        default : ""
    }
})


const User = mongoose.model("User", userSchema)

module.exports = { User }