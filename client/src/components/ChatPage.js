import React, { useState, useEffect, useRef } from 'react'
import {useLocation} from 'react-router-dom';
import io from 'socket.io-client'
import './ChatPage.css'
const ChatPage = () => {
  const [message, setMessage] = useState('')
  const [listComment, setListComment] = useState([])
  const [idUser, setIdUser] = useState()
  const urlBackEnd = process.env.REACT_APP_URL_API;
  const location = useLocation();
  const chatRoom = useRef(location.state.chatRoom)
  const userName = useRef(location.state.userName)
  const socketRef = useRef();
  useEffect(() => {
    //connect to backend
    socketRef.current = io(urlBackEnd)
    //get Id from socket Backend
    socketRef.current.on('idUser', data => {
      setIdUser(data)
      socketRef.current.emit('userJoin', { userName :userName.current, chatRoom: chatRoom.current })

      //gui su kien join room chat
      socketRef.current.emit('join', chatRoom.current)
    })
    socketRef.current.on('notiJoin', data => {console.log(data)})
    socketRef.current.on('sendDataServer', data => {
      setListComment(oldList => [...oldList, data])
    })
    // socketRef.current.emit('leaveInfo', userName.current)
  }, [])

  const handlerComment = (e) => {
    e.preventDefault()
    if(!message) {
      return alert('khong dc de trong')
    }
    const msgInfo = {
      message,
      idUser,
      chatRoom: chatRoom.current,
      userName: userName.current,
      timeComment: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    }
    socketRef.current.emit('sendDataClient', msgInfo)
    setMessage('')
  }
  return (
    <div className="box-chat">
      <div className="room-name"> Chat Room: {chatRoom.current}</div>
      <div className="box-chat_message">
        {listComment.map((cmt, idx) => 
        <div key={idx} className={`${cmt.idUser === idUser ? 'your-message' : 'other-people'} chat-item`}>
          {cmt.message}-<span style={{fontWeight: "bold"}} >{`${cmt.idUser === idUser ? 'you' : cmt.userName}`}</span>-{cmt.timeComment}
        </div>)}
      </div>

      <form className="send-box" onSubmit={handlerComment}>
          <input className="input-chat"
            placeholder="Nhập tin nhắn ..."
            value={message}
            onChange={e => setMessage(e.target.value)} 
          />
          <button type="submit">Send</button>
      </form>

    </div>
  )
}

export default ChatPage