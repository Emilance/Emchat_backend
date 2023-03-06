const  express = require("express")
const mongoose = require("mongoose")
const  http  = require('http')
const bodyParser = require('body-parser');
const  {Server} = require('socket.io')
const cors = require('cors')
const userRoute = require('./route/user').router


const app = express()
const PORT = process.env.PORT | 4000
app.use(cors())
const server = http.createServer(app)
app.use(bodyParser.json());


const io = new Server(server , {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket)=>{
    console.log(`user ${socket.id} connected`)
    
    socket.on("join_room",   (data)=>{
        socket.join(data)
        console.log(`User with id ${socket.id} joined room ${data}`)
    })
    socket.on("send_message",  (data)=>{
        console.log(data)
        socket.broadcast.emit("receive_message", data)
    })
    
    
})
const mongoURL = "mongodb+srv://emibrandlance:emibrandlance@cluster0.jcqf7hv.mongodb.net/?retryWrites=true&w=majority"

app.use("/api", userRoute)
app.get("/", (req, res) => {
    res.send("working perfectly well")
})

mongoose.set("strictQuery", true);

mongoose.connect(mongoURL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    server.listen(PORT , ()=>{
        console.log(`listening on port ${PORT}`)
    })
}).catch((err) => {
    console.log(err.message + "000 errrrror")
})




module.exports = app