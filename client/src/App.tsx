import React from 'react'
import { Routes, Route } from 'react-router-dom'

//public routes
import Login from './screens/Login'
import Signup from './screens/Signup'
import HomePage from './screens/HomePage'
import ForgotPassword from './screens/ForgotPassword'
import OtpVerification from './screens/OtpVerification'
import ResetPassword from './screens/ResetPassword'
import AboutUs from './screens/AboutUs'
import ContactUs from './screens/ContactUs'
import PrivacyPolicy from './screens/PrivacyPolicy'
import TermsOfService from './screens/TermsOfService'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  )
}

export default App
