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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                    <Shield className="text-3xl text-gray-600" size={32} />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                                    <p className="text-red-100">{profileData.role}</p>
                                    <p className="text-sm text-red-200">ID: {profileData.adminId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                            >
                                <Edit size={16} />
                                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                        {/* Personal Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <User className="mr-2 text-red-600" size={20} />
                                    Administrator Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <p className="text-gray-900">{profileData.department}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Clearance Level</label>
                                        <p className="text-gray-900 font-semibold text-red-600">{profileData.clearanceLevel}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                                        <p className="text-gray-900">{profileData.lastLogin}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-4">
                                        <button
                                            onClick={handleSave}
                                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* System Statistics */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <TrendingUp className="mr-2 text-blue-600" size={20} />
                                    System Overview
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">1,250</div>
                                        <div className="text-sm text-gray-600">Total Users</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">45</div>
                                        <div className="text-sm text-gray-600">Active Courses</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600">99.8%</div>
                                        <div className="text-sm text-gray-600">System Uptime</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-red-600">3</div>
                                        <div className="text-sm text-gray-600">Active Alerts</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* System Status */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">System Status</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Server className="mr-2" size={16} />
                                            Server Status
                                        </span>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">Online</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Users className="mr-2" size={16} />
                                            Active Users
                                        </span>
                                        <span className="font-semibold">847</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <AlertTriangle className="mr-2" size={16} />
                                            Alerts
                                        </span>
                                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">3</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Calendar className="mr-2" size={16} />
                                            Joined
                                        </span>
                                        <span className="font-semibold text-sm">{profileData.joinedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Actions */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Admin Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        User Management
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Course Management
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                                        System Reports
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                        Security Logs
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        System Maintenance
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center">
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