const roomModel = require('../models/rooms-chat')

const createNewRoom = async (req, res) => {
  try {
    const newRoom = req.body
    const room = new roomModel(newRoom)
    await room.save()
    res.status(200).json(room)
  } catch (e) {
    res.status(500).json({ error: e})
  }
}

const getAllRoom = async (req, res) => {
  try {
    const listRoom = await roomModel.find()
    res.status(200).json(listRoom)
  } catch (e) {
    res.status(500).json({ error: e})
  }
}

module.exports = {
  createNewRoom,
  getAllRoom
}