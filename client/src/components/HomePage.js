import React, {Fragment, useState} from 'react'
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigation = useNavigate()
  const [userName, setUserNam] = useState('')
  const [chatRoom, setChatRoom] = useState('')
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if(!userName || !chatRoom) {
      alert('Khong dc de trong')
    }
    navigation('/chat', {state: {userName, chatRoom}})
  }
  return (
    <Fragment>
      <h2>Chon Ten Va Phong Chat</h2>
      <form onSubmit={handleSubmitLogin}>
        <label>Nhap Ten:</label>
        <input placeholder="Nhap ten" 
        value={userName}
        onChange={e => setUserNam(e.target.value)}
        /><br />
        <label>Chon Phong Chat:</label>
        <input placeholder="Ten Phong Chat" 
        value={chatRoom}
        onChange={e => setChatRoom(e.target.value)}
        /><br />
        <br />
        <input type="submit" />
      </form>
    </Fragment>
  )
}

export default HomePage