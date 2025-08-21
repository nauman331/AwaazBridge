import React, { useState } from 'react'
import { User, BookOpen, Calendar, Edit, Settings, Users, Book, Star } from 'lucide-react'
import { useSelector } from 'react-redux'

const Profile: React.FC = () => {
    const { userdata } = useSelector((state: any) => state.auth)
    const [isEditing, setIsEditing] = useState(false)

    const handleSave = () => {
        setIsEditing(false)
        // Add API call to save profile data
    }

    return (
        <div className="min-h-screen bg-[#FFF7F0] dark:bg-[#002B5B] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 px-4 sm:px-8 py-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    {userdata?.picture ? (
                                        <img src={userdata.picture} alt={userdata.name || 'User Avatar'} className='w-full h-full rounded-full object-cover' />
                                    ) : (
                                        <BookOpen className="text-green-600" size={24} />
                                    )}
                                </div>
                                <div className="text-white">
                                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">{userdata?.name || ""}</h1>
                                    <p className="text-green-100 text-lg">{userdata?.position || "Teacher"}</p>
                                    <p className="text-sm text-green-200">ID: {userdata?.googleId || ""}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
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
                                    <User className="mr-3 text-green-600" size={20} />
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={userdata?.name || ""}
                                                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.name || ""}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={userdata?.email || ""}
                                                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.email || ""}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={userdata?.phone || ""}
                                                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.phone || ""}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Department</label>
                                        <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.department || ""}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Specialization</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={userdata?.specialization || ""}
                                                className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.specialization || ""}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Experience</label>
                                        <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.experience || ""}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-6 pt-4 border-t border-green-200">
                                        <button
                                            onClick={handleSave}
                                            className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-200 font-medium shadow-lg"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Teaching Stats */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h2 className="text-xl font-semibold mb-6 flex items-center text-[#002B5B] dark:text-white">
                                    <BookOpen className="mr-3 text-green-600" size={20} />
                                    Teaching Statistics
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Active Courses</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-green-500 mb-1">142</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Total Students</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-green-600 mb-1">4.8</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Avg Rating</div>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-bold text-green-500 mb-1">15</div>
                                        <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Publications</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Stats */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">Quick Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Book className="mr-2 text-green-600" size={16} />
                                            Courses
                                        </span>
                                        <span className="font-semibold text-[#002B5B] dark:text-white">5</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Users className="mr-2 text-green-500" size={16} />
                                            Students
                                        </span>
                                        <span className="font-semibold text-[#002B5B] dark:text-white">142</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Star className="mr-2 text-green-600" size={16} />
                                            Rating
                                        </span>
                                        <span className="font-semibold text-[#002B5B] dark:text-white">4.8/5</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                                            <Calendar className="mr-2 text-green-500" size={16} />
                                            Joined
                                        </span>
                                        <span className="font-semibold text-sm text-[#002B5B] dark:text-white">{new Date(userdata?.createdAt).toLocaleDateString() || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button className="w-full text-left px-4 py-3 text-green-600 hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        Manage Courses
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-green-500 hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        View Students
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-green-600 hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        Grade Assignments
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-green-500 hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                                        Schedule Classes
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