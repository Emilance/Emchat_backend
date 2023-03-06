const  mongoose = require("mongoose")

const Schema = mongoose.Schema


const userSchema =  Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName :{
        type: String,
        required : true
    },
    email : {
        type:String,
        required : true
    },
    gender : {
         type: String,
         enum : ["male", "female"]
    } 
})


const User = mongoose.model("User", userSchema)

module.exports = { User }