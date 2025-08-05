import React, { useState } from 'react'
import { User, GraduationCap, Calendar, Edit, Settings, Book, Trophy } from 'lucide-react'

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234 567 8900',
    studentId: 'STU2024001',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: '3.8',
    joinedDate: 'September 2022'
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                  <User className="text-3xl text-gray-600" size={32} />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-blue-100">Student</p>
                  <p className="text-sm text-blue-200">ID: {profileData.studentId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center space-x-2"
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
                  <User className="mr-2 text-blue-600" size={20} />
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <p className="text-gray-900">{profileData.course}</p>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-4">
                    <button
                      onClick={handleSave}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Academic Progress */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <GraduationCap className="mr-2 text-green-600" size={20} />
                  Academic Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{profileData.gpa}</div>
                    <div className="text-sm text-gray-600">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{profileData.year}</div>
                    <div className="text-sm text-gray-600">Academic Year</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">24</div>
                    <div className="text-sm text-gray-600">Credits Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Book className="mr-2" size={16} />
                      Courses
                    </span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-gray-600">
                      <Trophy className="mr-2" size={16} />
                      Achievements
                    </span>
                    <span className="font-semibold">3</span>
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
                  <button className="w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    View Courses
                  </button>
                  <button className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    Check Grades
                  </button>
                  <button className="w-full text-left px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    Schedule
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