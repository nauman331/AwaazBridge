import React from 'react'
import { Routes, Route } from 'react-router-dom'

//public routes
import Login from './screens/Login'
import Signup from './screens/Signup'
import HomePage from './screens/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
