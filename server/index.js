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

//io là đại diện cho tất cả socket, sử dụng io để gửi đến tất cả socket đang truy cập
//socket là chỉ dành riêng cho socket đang truy cập thôi

io.on("connection", socket => {
  console.log('new Websocket connection')
  socket.emit('idUser', socket.id)
  //lang nghe su kien join room chat
  socket.on('join', data => {
    //phuong thuc join de socket join vao room
    socket.join(data);
  })
  socket.on('userJoin', data => {
    socket.broadcast.to(data.chatRoom).emit('notiJoin', `${data.userName} đã tham gia phòng chat`)
  })
  socket.on('sendDataClient', (data) => {
    io.to(data.chatRoom).emit('sendDataServer', data)
  })

  //bắt sự kiện socket kết nối
  socket.on('disconnect', () => {
    // socket.on('leaveInfo', data => {
    //   console.log(data)
    // })
    console.log('leaved')
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


//note: trong real time có namespace, phải set namespace thì các sự kiện cùng namespace mới lắng nghe đc
// + phía server phải set name space bằng cách: io.of('/name-space')
//    ví dụ: io.of('/chat').on('connection', ....)
// + phía client phải set name space: io('/baseUrl/chat')
//    ví dụ: io('localhost:3000/chat')

//trong app này chỉ set room, ko set namespace