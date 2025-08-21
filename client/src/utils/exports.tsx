import {
    FileText,
    Bell,
    User,
    BookOpen,
    Calendar,
    Trophy,
    Home,
    Users,
    BarChart3,
    UserCheck,
    BookMarked,
    GraduationCap,
    ClipboardList
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

export const adminnavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
    { icon: UserCheck, label: 'Teachers', path: '/admin/teachers' },
    { icon: GraduationCap, label: 'Students', path: '/admin/students' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
]

export const teachernavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/teacher' },
    { icon: User, label: 'Profile', path: '/teacher/profile' },
    { icon: BookMarked, label: 'My Courses', path: '/teacher/courses' },
    { icon: GraduationCap, label: 'Students', path: '/teacher/students' },
    { icon: ClipboardList, label: 'Assignments', path: '/teacher/assignments' },
    { icon: Calendar, label: 'Schedule', path: '/teacher/schedule' },
    { icon: BarChart3, label: 'Grades', path: '/teacher/grades' },
    { icon: Bell, label: 'Notifications', path: '/teacher/notifications' },
]