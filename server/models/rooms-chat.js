const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  roomName: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('rooms', RoomSchema)