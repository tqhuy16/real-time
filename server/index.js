const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const socketio = require('socket.io')
const http = require('http')

const roomRouter = require('./routers/room')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
      origin: "*",
  }
})

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 4000

app.use('/', roomRouter)

io.on("connection", socket => {
  console.log('new Websocket connection')
  socket.emit('idUser', socket.id)
  socket.on('join', data => {
    socket.join(data);
  })
  socket.on('sendDataClient', (data) => {
    io.to(data.chatRoom).emit('sendDataServer', data)
  })
});

//Connect to MongoDB
const URI = 'mongodb+srv://tqhuy:1604@cluster0.g6r81.mongodb.net/real-time?retryWrites=true&w=majority'
const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    server.listen(port, () => {
      console.log(`server is running on port ${port}`)
    })
    
  } catch (e) {
    console.log(e.message)
  }
}
connectDB()
