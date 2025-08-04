import React, { useState } from 'react'
import { User, BookOpen, Calendar, Edit, Settings, Users, Book, Star } from 'lucide-react'

const Profile: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        phone: '+1 234 567 8901',
        employeeId: 'TEA2020045',
        department: 'Computer Science',
        position: 'Associate Professor',
        specialization: 'Machine Learning & AI',
        experience: '8 years',
        joinedDate: 'January 2016'
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
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                                    <BookOpen className="text-3xl text-gray-600" size={32} />
                                </div>
                                <div className="text-white">
                                    <h1 className="text-3xl font-bold">{profileData.name}</h1>
                                    <p className="text-green-100">{profileData.position}</p>
                                    <p className="text-sm text-green-200">ID: {profileData.employeeId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center space-x-2"
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
                                    <User className="mr-2 text-green-600" size={20} />
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.specialization}
                                                onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">{profileData.specialization}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                                        <p className="text-gray-900">{profileData.experience}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-4">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Teaching Stats */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <BookOpen className="mr-2 text-blue-600" size={20} />
                                    Teaching Statistics
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">5</div>
                                        <div className="text-sm text-gray-600">Active Courses</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">142</div>
                                        <div className="text-sm text-gray-600">Total Students</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-yellow-600">4.8</div>
                                        <div className="text-sm text-gray-600">Avg Rating</div>
                                    </div>
                                    <div className="text-center p-4 bg-white rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">15</div>
                                        <div className="text-sm text-gray-600">Publications</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Overview</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Book className="mr-2" size={16} />
                                            Courses
                                        </span>
                                        <span className="font-semibold">5</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Users className="mr-2" size={16} />
                                            Students
                                        </span>
                                        <span className="font-semibold">142</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center text-gray-600">
                                            <Star className="mr-2" size={16} />
                                            Rating
                                        </span>
                                        <span className="font-semibold">4.8/5</span>
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

                            {/* Quick Actions */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                        Manage Courses
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                        View Students
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                                        Grade Assignments
                                    </button>
                                    <button className="w-full text-left px-4 py-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors">
                                        Schedule Classes
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