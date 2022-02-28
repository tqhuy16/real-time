import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'

import HomePage from './components/HomePage'
import ChatPage from './components/ChatPage'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chat' element={<ChatPage />} />
    </Routes>
  )
}

export default App;
