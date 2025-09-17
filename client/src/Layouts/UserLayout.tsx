import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
    Settings,
    LogOut,
    Menu,
    X,
    Video
} from 'lucide-react'
import { userNavigationItems } from "../utils/exports"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../store/slices/authSlice"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useNavigate } from 'react-router-dom'

const UserLayout: React.FC = () => {
    const dispatch = useDispatch()
    const { userdata } = useSelector((state: any) => state.auth)
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [logoutConfirmation, setLogoutConfirmation] = useState<boolean>(false)
    const location = useLocation()

    const isActiveRoute = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-white dark:from-[#0f172a] dark:to-[#1e293b] flex">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full z-50 transform transition-all duration-300 ease-out ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 lg:translate-x-0'} ${isHovered ? 'lg:w-72' : 'lg:w-20'} bg-white/90 dark:bg-[#1e293b]/90 shadow-2xl border-r border-[#22c55e]/20 rounded-tr-3xl rounded-br-3xl backdrop-blur-xl`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Sidebar Header */}
                <div className="relative p-4 bg-gradient-to-r from-[#1e40af] to-[#22c55e] border-b border-[#22c55e]/20 rounded-tr-3xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#22c55e]/30">
                                <img src={userdata.picture} alt="profile pic" className='rounded-full' />
                            </div>
                            <div className={`transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block`}>
                                <h2 className="text-xl font-extrabold text-white tracking-wide">{userdata.name}</h2>
                                <p className="text-green-100 text-xs font-medium">User Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="text-white" size={20} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-2 py-6 space-y-2">
                    {userNavigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = isActiveRoute(item.path)

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white shadow-lg'
                                    : 'text-[#334155] dark:text-[#cfd8e3] hover:bg-[#1e40af]/10 dark:hover:bg-[#22c55e]/10 hover:text-[#22c55e]'
                                    }`}
                            >
                                <Icon
                                    size={20}
                                    className={`transition-all duration-200 flex-shrink-0 ${isActive
                                        ? 'text-white'
                                        : 'group-hover:text-[#22c55e] group-hover:scale-110'
                                        }`}
                                />
                                <span className={`font-semibold text-base transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block ${isActive ? 'text-white' : ''}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className={`ml-auto flex items-center space-x-1 transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block`}>
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-[#22c55e]/20 p-3 space-y-2 bg-gradient-to-t from-[#22c55e]/10 to-transparent rounded-br-3xl">
                    <Link
                        to="/user/profile"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[#334155] dark:text-[#cfd8e3] hover:bg-[#1e40af]/10 dark:hover:bg-[#22c55e]/10 hover:text-[#22c55e] transition-all duration-200 group"
                    >
                        <Settings size={20} className="group-hover:text-[#22c55e] group-hover:rotate-45 transition-all duration-200 flex-shrink-0" />
                        <span className={`font-semibold text-base transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block`}>
                            Settings
                        </span>
                    </Link>
                    <button
                        onClick={() => setLogoutConfirmation(!logoutConfirmation)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200 group w-full">
                        <LogOut size={20} className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                        <span className={`font-semibold text-base transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block`}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className={`flex-1 min-h-screen transition-all duration-300 ${isHovered ? 'lg:ml-72' : 'lg:ml-20'} flex flex-col bg-white/80 dark:bg-[#0f172a]/80 rounded-l-3xl ml-0 lg:ml-0`}>
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#1e293b]/95 backdrop-blur-xl border-b border-[#22c55e]/20 px-4 py-3 shadow-md rounded-b-2xl">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-[#1e40af]/10 dark:hover:bg-[#22c55e]/10 transition-colors"
                        >
                            <Menu className="text-[#1e40af] dark:text-[#22c55e]" size={22} />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-xl flex items-center justify-center shadow-md">
                                <Video className="text-white" size={16} />
                            </div>
                            <span className="text-xl font-extrabold text-[#1e40af] dark:text-white tracking-wide">VoiceLink</span>
                        </div>
                        <div className="w-10"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-0 md:p-4">
                    <Outlet />
                </main>

                {/* Logout Confirmation Dialog */}
                <AlertDialog open={logoutConfirmation} onOpenChange={setLogoutConfirmation}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to log out? You will need to sign in again to access your account.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setLogoutConfirmation(false)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                dispatch(logout())
                                navigate('/login')
                                setLogoutConfirmation(false)
                            }}>
                                Logout
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}


export default UserLayout
