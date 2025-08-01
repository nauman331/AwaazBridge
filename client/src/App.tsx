import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { googleClientId } from './utils/exports'

//public routes
import Loader from './components/Loader'
const Login = lazy(() => import('./screens/Login'))
const Signup = lazy(() => import('./screens/Signup'))
const HomePage = lazy(() => import('./screens/HomePage'))
const ForgotPassword = lazy(() => import('./screens/ForgotPassword'))
const OtpVerification = lazy(() => import('./screens/OtpVerification'))
const ResetPassword = lazy(() => import('./screens/ResetPassword'))
const AboutUs = lazy(() => import('./screens/AboutUs'))
const ContactUs = lazy(() => import('./screens/ContactUs'))
const PrivacyPolicy = lazy(() => import('./screens/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./screens/TermsOfService'))

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Suspense fallback={<Loader />}>
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
      </Suspense>
    </GoogleOAuthProvider>
  )
}

export default App
