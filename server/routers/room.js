const express = require('express')
const roomRouter = express.Router()

const { createNewRoom, getAllRoom } = require('../controllers/room')

roomRouter.get('/', getAllRoom)
roomRouter.post('/newRoom', createNewRoom)

module.exports = roomRouter