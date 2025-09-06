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
import { useDispatch } from 'react-redux'
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
    const navigate = useNavigate()
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [logoutConfirmation, setLogoutConfirmation] = useState<boolean>(false)
    const location = useLocation()

    const isActiveRoute = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/')
    }

    return (
        <div className="min-h-screen bg-[#FFF7F0] dark:bg-[#002B5B]">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-[#0a1a33] border-r border-[#FF9F1C]/20 shadow-lg z-50 transform transition-all duration-300 ease-out ${isSidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 lg:translate-x-0'
                    } ${isHovered ? 'lg:w-72' : 'lg:w-16'
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Sidebar Header */}
                <div className="relative p-4 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] border-b border-[#FF9F1C]/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <Video className="text-[#FF6B00]" size={18} />
                            </div>
                            <div className={`transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'} block`}>
                                <h2 className="text-lg font-bold text-white">VoiceLink</h2>
                                <p className="text-orange-100 text-xs font-medium">User Dashboard</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="text-white" size={18} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
                    {userNavigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = isActiveRoute(item.path)

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white shadow-md'
                                    : 'text-[#666] dark:text-[#cfd8e3] hover:bg-[#FF6B00]/10 dark:hover:bg-[#FF6B00]/20 hover:text-[#FF6B00]'
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    className={`transition-all duration-200 flex-shrink-0 ${isActive
                                        ? 'text-white'
                                        : 'group-hover:text-[#FF6B00] group-hover:scale-110'
                                        }`}
                                />
                                <span className={`font-medium text-sm transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'
                                    } block ${isActive ? 'text-white' : ''}`}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className={`ml-auto flex items-center space-x-1 transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'
                                        } block`}>
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-[#FF9F1C]/20 p-2 space-y-1 bg-gradient-to-t from-[#FF6B00]/5 to-transparent">
                    <Link
                        to="/user/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-[#666] dark:text-[#cfd8e3] hover:bg-[#FF6B00]/10 dark:hover:bg-[#FF6B00]/20 hover:text-[#FF6B00] transition-all duration-200 group"
                    >
                        <Settings size={18} className="group-hover:text-[#FF6B00] group-hover:rotate-45 transition-all duration-200 flex-shrink-0" />
                        <span className={`font-medium text-sm transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'
                            } block`}>
                            Settings
                        </span>
                    </Link>
                    <button
                        onClick={() => setLogoutConfirmation(!logoutConfirmation)}
                        className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-200 group w-full">
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" />
                        <span className={`font-medium text-sm transition-all duration-300 ${isHovered || isSidebarOpen ? 'opacity-100 lg:block' : 'opacity-0 lg:hidden'
                            } block`}>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`min-h-screen transition-all duration-300 ${isHovered ? 'lg:ml-72' : 'lg:ml-16'}`}>
                {/* Mobile Header */}
                <header className="lg:hidden sticky top-0 z-30 bg-white/95 dark:bg-[#0a1a33]/95 backdrop-blur-xl border-b border-[#FF9F1C]/20 px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 rounded-lg hover:bg-[#FF6B00]/10 dark:hover:bg-[#FF6B00]/20 transition-colors"
                        >
                            <Menu className="text-[#FF6B00] dark:text-[#FF9F1C]" size={20} />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-7 h-7 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] rounded-lg flex items-center justify-center shadow-sm">
                                <Video className="text-white" size={14} />
                            </div>
                            <span className="text-lg font-bold text-[#002B5B] dark:text-white">VoiceLink</span>
                        </div>
                        <div className="w-10"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main>
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
