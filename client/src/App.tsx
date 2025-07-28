import React from 'react'
import { Routes, Route } from 'react-router-dom'

//public routes
import Login from './screens/Login'
import Signup from './screens/Signup'
import HomePage from './screens/HomePage'
import ForgotPassword from './screens/ForgotPassword'
import OtpVerification from './screens/OtpVerification'
import ResetPassword from './screens/ResetPassword'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  )
}

export default App
