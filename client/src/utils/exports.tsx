import {
    FileText,
    Bell,
    User,
    BookOpen,
    Calendar,
    Trophy,
    Home
} from 'lucide-react'

// export const backendUrl = "https://finance-fire-svpq.vercel.app/api/v1/";
export const backendUrl = "http://localhost:5000/api/v1/";
export const googleClientId = "268486767053-den8fcjmuhauvah75hp80a01rr0i6580.apps.googleusercontent.com";

export const studentnavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/student' },
    { icon: User, label: 'Profile', path: '/student/profile' },
    { icon: BookOpen, label: 'Courses', path: '/student/courses' },
    { icon: Calendar, label: 'Schedule', path: '/student/schedule' },
    { icon: FileText, label: 'Assignments', path: '/student/assignments' },
    { icon: Trophy, label: 'Achievements', path: '/student/achievements' },
    { icon: Bell, label: 'Notifications', path: '/student/notifications' },
]