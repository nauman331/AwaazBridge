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
    <div className="min-h-screen bg-[#FFF7F0] dark:bg-[#002B5B] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-[#0a1a33] rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#002B5B] to-[#FF6B00] px-4 sm:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <User className="text-[#002B5B]" size={24} />
                </div>
                <div className="text-white">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">{profileData.name}</h1>
                  <p className="text-blue-100 text-lg">Student</p>
                  <p className="text-sm text-blue-200">ID: {profileData.studentId}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-[#002B5B] px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium"
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
                  <User className="mr-3 text-[#002B5B] dark:text-[#FF6B00]" size={20} />
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#002B5B] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
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
                        className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#002B5B] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
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
                        className="w-full px-4 py-3 border border-[#FF9F1C] rounded-lg focus:ring-2 focus:ring-[#002B5B] focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                      />
                    ) : (
                      <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Course</label>
                    <p className="text-[#002B5B] dark:text-white py-3 font-medium">{profileData.course}</p>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 pt-4 border-t border-[#FF9F1C]/20">
                    <button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-[#002B5B] to-[#FF6B00] text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-200 font-medium shadow-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              {/* Academic Progress */}
              <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6 flex items-center text-[#002B5B] dark:text-white">
                  <GraduationCap className="mr-3 text-[#FF6B00]" size={20} />
                  Academic Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-2xl font-bold text-[#002B5B] dark:text-[#FF6B00] mb-1">{profileData.gpa}</div>
                    <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Current GPA</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-2xl font-bold text-[#FF6B00] mb-1">{profileData.year}</div>
                    <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Academic Year</div>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                    <div className="text-2xl font-bold text-[#FF9F1C] mb-1">24</div>
                    <div className="text-sm text-[#444] dark:text-[#cfd8e3]">Credits Earned</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                    <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                      <Book className="mr-2 text-[#002B5B] dark:text-[#FF6B00]" size={16} />
                      Courses
                    </span>
                    <span className="font-semibold text-[#002B5B] dark:text-white">6</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-[#223355] rounded-lg">
                    <span className="flex items-center text-[#444] dark:text-[#cfd8e3]">
                      <Trophy className="mr-2 text-[#FF6B00]" size={16} />
                      Achievements
                    </span>
                    <span className="font-semibold text-[#002B5B] dark:text-white">3</span>
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

              {/* Quick Actions */}
              <div className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-[#002B5B] dark:text-white">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 text-[#002B5B] dark:text-[#FF6B00] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                    View Courses
                  </button>
                  <button className="w-full text-left px-4 py-3 text-[#FF6B00] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                    Check Grades
                  </button>
                  <button className="w-full text-left px-4 py-3 text-[#FF9F1C] hover:bg-white dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-medium">
                    Schedule
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