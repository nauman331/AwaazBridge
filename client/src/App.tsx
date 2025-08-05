import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from "@react-oauth/google"
import { googleClientId } from './utils/exports'
// layouts
import StudentLayout from './Layouts/StudentLayout'

//extras
import Loader from './components/Loader';
import useFetch from './hooks/useFetch'
import { useDispatch } from 'react-redux'
import { setUserdata } from "./store/slices/authSlice"

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
// student routes
const StudentProfile = lazy(() => import('./screens/Student/Profile'))

//admin routes
const AdminProfile = lazy(() => import('./screens/Admin/Profile'))

// teacher routes
const TeacherProfile = lazy(() => import('./screens/Teacher/Profile'))


const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data } = useFetch({
    url: 'auth/profile',
    autoFetch: true,
    isAuth: true
  });

  if (loading) {
    return <Loader />;
  }
  if (data?.isOk) {
    dispatch(setUserdata(data));
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
            {/* Student Routes */}
            <Route path='/student' element={<StudentLayout />} >
              <Route index element={<StudentProfile />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
            {/* Admin Routes */}
            <Route path='/admin' element={<StudentLayout />} >
              <Route index element={<AdminProfile />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
            {/* Teacher Routes */}
            <Route path='/teacher' element={<StudentLayout />} >
              <Route index element={<TeacherProfile />} />
              <Route path="profile" element={<TeacherProfile />} />
            </Route>
          </Routes>
        </ProtectedRoute>
      </Suspense>
    </GoogleOAuthProvider>
  )
}

export default App