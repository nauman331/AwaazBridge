import {
    Video,
    Bell,
    User,
    Phone,
    History,
    Home,
    Users,
    BarChart3,
    Settings,
    Languages,
    MessageSquare
} from 'lucide-react'

export const backendUrl = "https://finance-fire-svpq.vercel.app/api/v1/";


export const googleClientId = "268486767053-den8fcjmuhauvah75hp80a01rr0i6580.apps.googleusercontent.com";

export const userNavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/user' },
    { icon: User, label: 'Profile', path: '/user/profile' },
    { icon: Video, label: 'Start Call', path: '/user/video-call' },
    { icon: Phone, label: 'Quick Call', path: '/user/quick-call' },
    { icon: History, label: 'Call History', path: '/user/history' },
    { icon: Languages, label: 'Translation Settings', path: '/user/translation' },
    { icon: MessageSquare, label: 'Messages', path: '/user/messages' },
    { icon: Bell, label: 'Notifications', path: '/user/notifications' },
]

export const adminnavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: User, label: 'Profile', path: '/admin/profile' },
    { icon: Users, label: 'Manage Users', path: '/admin/users' },
    { icon: Video, label: 'Call Analytics', path: '/admin/calls' },
    { icon: Languages, label: 'Translation Stats', path: '/admin/translation' },
    { icon: BarChart3, label: 'System Analytics', path: '/admin/analytics' },
    { icon: Settings, label: 'Platform Settings', path: '/admin/settings' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
]

export const moderatorNavigationItems = [
    { icon: Home, label: 'Dashboard', path: '/moderator' },
    { icon: User, label: 'Profile', path: '/moderator/profile' },
    { icon: Video, label: 'Monitor Calls', path: '/moderator/monitor' },
    { icon: Users, label: 'User Support', path: '/moderator/support' },
    { icon: Languages, label: 'Translation Quality', path: '/moderator/quality' },
    { icon: BarChart3, label: 'Reports', path: '/moderator/reports' },
    { icon: Bell, label: 'Notifications', path: '/moderator/notifications' },
]