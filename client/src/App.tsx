import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { googleClientId } from './utils/exports'
// layouts
import UserLayout from './Layouts/UserLayout'
import ModeratorLayout from './Layouts/ModeratorLayout'

//extras
import Loader from './components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { setUserdata } from "./store/slices/authSlice"
import useFetch from './hooks/useFetch';

//public routes
import ProtectedRoute from './utils/ProtectedRoute';
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
const NotFound = lazy(() => import('./screens/NotFound'))
// user routes
const UserProfile = lazy(() => import('./screens/User/Profile'))
const VideoCall = lazy(() => import('./screens/User/VideoCall'))

// moderator routes
const ModeratorProfile = lazy(() => import('./screens/Moderator/Profile'))


const App: React.FC = () => {
  const { token } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { isPending, data: userData, isSuccess } = useFetch('auth/profile', true, "profile");

  if (token && isPending) {
    return <Loader />
  }
  if (isSuccess && userData) {
    dispatch(setUserdata(userData))
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Suspense fallback={<Loader />}>
        <ProtectedRoute>
          <Routes>
            {/* public routes */}
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
            {/* User Routes */}
            <Route path='/user' element={<UserLayout />} >
              <Route index element={<UserProfile />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="video-call" element={<VideoCall />} />
            </Route>
            {/* Moderator Routes */}
            <Route path='/moderator' element={<ModeratorLayout />} >
              <Route index element={<ModeratorProfile />} />
              <Route path="profile" element={<ModeratorProfile />} />
            </Route>
            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ProtectedRoute>
      </Suspense>
    </GoogleOAuthProvider>
  )
}

export default App