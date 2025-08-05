import React, { useState } from 'react'
import { User, Shield, Calendar, Edit, Settings, Users, TrendingUp, Server, AlertTriangle } from 'lucide-react'

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: 'Michael Chen',
        email: 'michael.chen@financefire.com',
        phone: '+1 234 567 8902',
        adminId: 'ADM2019001',
        role: 'System Administrator',
        department: 'IT Operations',
        clearanceLevel: 'Level 5',
        lastLogin: '2024-01-15 09:30 AM',
        joinedDate: 'March 2019'
    })

    const handleSave = () => {
        setIsEditing(false)
        // Add API call to save profile data
    }

    return (
        <div className="min-h-screen bg-[#FFF7F0] dark:bg-[#002B5B] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#002B5B] via-[#FF6B00] to-[#FF9F1C] px-4 sm:px-8 py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <Shield className="text-[#002B5B]" size={24} />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">{profileData.name}</h1>
                                    <p className="text-orange-100 text-lg">{profileData.role}</p>
                                    <p className="text-sm text-orange-200">ID: {profileData.adminId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-[#002B5B] px-4 py-2 rounded-lg hover:bg-orange-50 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
                            >
                                <Edit size={16} />
                                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 p-4 sm:p-8">
                        {/* Personal Information */}
                        <div className="xl:col-span-2 space-y-6">
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6 flex items-center text-[#002B5B] dark:text-white">
                                    <User className="mr-3 text-[#FF6B00]" size={20} />
                                    Administrator Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Department</label>
                                        <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.department}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Clearance Level</label>
                                        <p className="text-[#FF6B00] py-3 font-semibold">{profileData.clearanceLevel}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Last Login</label>
                                        <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.lastLogin}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-6 pt-4 border-t border-[#FF9F1C]/20">
                                        <button
                                            onClick={handleSave}
                                            className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-200 font-medium shadow-lg"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* System Statistics */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6 flex items-center text-[#002B5B] dark:text-white">
                                    <TrendingUp className="mr-3 text-[#FF6B00]" size={20} />
                                    System Overview
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-[#002B5B] dark:text-[#FF6B00] mb-1">1,250</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Total Users</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-[#FF6B00] mb-1">45</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Active Courses</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-[#FF9F1C] mb-1">99.8%</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">System Uptime</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-[#FF6B00] mb-1">3</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Active Alerts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* System Status */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">System Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Server className="mr-2 text-[#FF6B00]" size={16} />
                                            Server Status
                                        </span>
                                        <span className="px-2 py-1 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full text-xs font-semibold">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Users className="mr-2 text-[#FF9F1C]" size={16} />
                                            Active Users
                                        </span>
                                        <span className="font-semibold text-[#002B5B] dark:text-white">847</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <AlertTriangle className="mr-2 text-[#FF6B00]" size={16} />
                                            Alerts
                                        </span>
                                        <span className="px-2 py-1 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full text-xs font-semibold">3</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Calendar className="mr-2 text-[#FF9F1C]" size={16} />
                                            Joined
                                        </span>
                                        <span className="font-semibold text-sm text-[#002B5B] dark:text-white">{profileData.joinedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Actions */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">Admin Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-4 py-3 text-[#002B5B] dark:text-[#FF6B00] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        User Management
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-[#FF6B00] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        Course Management
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-[#FF9F1C] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        System Reports
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-[#002B5B] dark:text-[#FF9F1C] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        Security Logs
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-[#FF6B00] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        System Maintenance
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-[#444] dark:text-[#cfd8e3] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 flex items-center font-medium">
                                        <Settings className="mr-2" size={16} />
                                        Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile