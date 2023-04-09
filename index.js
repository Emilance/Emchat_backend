const  express = require("express")
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require('cors')
const userRoute = require('./route/user').router
const chatRoute = require('./route/chat').router
const messageRoute = require("./route/message").router

require('dotenv').config()

const app = express()


app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT | 4000

app.use("/api/user", userRoute)
app.use("/api/chat", chatRoute)
app.use("/api/message", messageRoute)

app.get("/", (req, res) => {
    res.send("working perfectly well")
})








const mongoURL = process.env.MONGO_URL
console.log(mongoURL)
mongoose.set("strictQuery", true);

mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
}).then(() => {
    app.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err.message + "000 errrrror")
})





// const io = new Server(server , {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     }
// })

// io.on("connection", (socket)=>{
//     console.log(`user ${socket.id} connected`)
    
//     socket.on("join_room",   (data)=>{
//         socket.join(data)
//         console.log(`User with id ${socket.id} joined room ${data}`)
//     })
//     socket.on("send_message",  (data)=>{
//         console.log(data)
//         socket.broadcast.emit("receive_message", data)
//     })
    
    
// })



module.exports = app