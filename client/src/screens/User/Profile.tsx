import React, { useState } from 'react'
import { User, Video, Calendar, Edit, Settings, Phone, Languages, Headphones } from 'lucide-react'
import { useSelector } from 'react-redux'

const Profile: React.FC = () => {
    const { userdata } = useSelector((state: any) => state.auth)
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: userdata?.name || 'John Doe',
        email: userdata?.email || 'john.doe@email.com',
        phone: userdata?.phone || '+1 234 567 8900',
        userId: userdata?.googleId || 'USER2024001',
        preferredLanguage: userdata?.preferredLanguage || 'English',
        country: userdata?.country || 'United States',
        timezone: userdata?.timezone || 'EST (UTC-5)',
        joinedDate: 'January 2024'
    })

    const handleSave = () => {
        setIsEditing(false)
        // Add API call to save profile data
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-white dark:from-[#0f172a] dark:to-[#1e293b] p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/90 dark:bg-[#1e293b]/90 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#1e40af] to-[#22c55e] px-4 sm:px-8 py-8">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#22c55e]/30">
                                    {userdata?.picture ? (
                                        <img src={userdata.picture} alt={userdata.name || 'User Avatar'} className='w-full h-full rounded-full object-cover' />
                                    ) : (
                                        <Video className="text-[#1e40af]" size={32} />
                                    )}
                                </div>
                                <div className="text-white">
                                    <h1 className="text-3xl font-extrabold mb-1 tracking-tight">{profileData.name}</h1>
                                    <p className="text-green-100 text-lg font-semibold">VoiceLink User</p>
                                    <p className="text-sm text-blue-100">ID: {profileData.userId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-white text-[#1e40af] px-6 py-3 rounded-xl hover:bg-[#f0f9ff] transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg font-semibold border border-[#22c55e]/30"
                            >
                                <Edit size={18} />
                                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-4 sm:p-10">
                        {/* Personal Information */}
                        <div className="xl:col-span-2 space-y-8">
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold mb-8 flex items-center text-[#1e40af] dark:text-white">
                                    <User className="mr-3 text-[#22c55e]" size={24} />
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#22c55e] rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white dark:bg-[#223355] text-[#1e40af] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Email</label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#22c55e] rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white dark:bg-[#223355] text-[#1e40af] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Phone</label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#22c55e] rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white dark:bg-[#223355] text-[#1e40af] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.phone}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Country</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={profileData.country}
                                                onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#22c55e] rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white dark:bg-[#223355] text-[#1e40af] dark:text-white transition-all"
                                            />
                                        ) : (
                                            <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.country}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Preferred Language</label>
                                        {isEditing ? (
                                            <select
                                                value={profileData.preferredLanguage}
                                                onChange={(e) => setProfileData({ ...profileData, preferredLanguage: e.target.value })}
                                                className="w-full px-4 py-3 border border-[#22c55e] rounded-lg focus:ring-2 focus:ring-[#1e40af] focus:border-transparent bg-white dark:bg-[#223355] text-[#1e40af] dark:text-white transition-all"
                                            >
                                                <option value="English">English</option>
                                                <option value="Spanish">Spanish</option>
                                                <option value="French">French</option>
                                                <option value="German">German</option>
                                                <option value="Chinese">Chinese</option>
                                                <option value="Japanese">Japanese</option>
                                                <option value="Arabic">Arabic</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Urdu">Urdu</option>
                                            </select>
                                        ) : (
                                            <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.preferredLanguage}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-[#1e40af] dark:text-[#e0e6ef] mb-2">Timezone</label>
                                        <p className="text-[#1e40af] dark:text-white py-3 font-semibold">{profileData.timezone}</p>
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="mt-8 pt-6 border-t border-[#22c55e]/20">
                                        <button
                                            onClick={handleSave}
                                            className="bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white px-8 py-3 rounded-xl hover:brightness-110 transition-all duration-200 font-bold shadow-lg"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Call Statistics */}
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold mb-8 flex items-center text-[#1e40af] dark:text-white">
                                    <Video className="mr-3 text-[#22c55e]" size={24} />
                                    Call Statistics
                                </h2>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="text-center p-5 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-extrabold text-[#1e40af] mb-1">47</div>
                                        <div className="text-sm text-[#64748b] dark:text-[#cfd8e3]">Total Calls</div>
                                    </div>
                                    <div className="text-center p-5 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-extrabold text-[#22c55e] mb-1">12h 30m</div>
                                        <div className="text-sm text-[#64748b] dark:text-[#cfd8e3]">Talk Time</div>
                                    </div>
                                    <div className="text-center p-5 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-extrabold text-[#1e40af] mb-1">8</div>
                                        <div className="text-sm text-[#64748b] dark:text-[#cfd8e3]">Languages Used</div>
                                    </div>
                                    <div className="text-center p-5 bg-white dark:bg-[#223355] rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="text-2xl font-extrabold text-[#22c55e] mb-1">23</div>
                                        <div className="text-sm text-[#64748b] dark:text-[#cfd8e3]">Countries Connected</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Quick Stats */}
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-[#1e40af] dark:text-white">Quick Overview</h3>
                                <div className="space-y-5">
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#64748b] dark:text-[#cfd8e3]">
                                            <Phone className="mr-2 text-[#22c55e]" size={18} />
                                            Active Calls
                                        </span>
                                        <span className="font-bold text-[#1e40af] dark:text-white">0</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#64748b] dark:text-[#cfd8e3]">
                                            <Languages className="mr-2 text-[#22c55e]" size={18} />
                                            Preferred Language
                                        </span>
                                        <span className="font-bold text-[#1e40af] dark:text-white">{profileData.preferredLanguage}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#64748b] dark:text-[#cfd8e3]">
                                            <Headphones className="mr-2 text-[#22c55e]" size={18} />
                                            Audio Quality
                                        </span>
                                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">HD</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#223355] rounded-lg">
                                        <span className="flex items-center text-[#64748b] dark:text-[#cfd8e3]">
                                            <Calendar className="mr-2 text-[#22c55e]" size={18} />
                                            Joined
                                        </span>
                                        <span className="font-bold text-sm text-[#1e40af] dark:text-white">{profileData.joinedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-[#1e40af] dark:text-white">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full text-left px-5 py-4 text-[#1e40af] hover:bg-[#e0f2fe] dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-bold">
                                        Start Video Call
                                    </button>
                                    <button className="w-full text-left px-5 py-4 text-[#22c55e] hover:bg-[#e0f2fe] dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-bold">
                                        View Call History
                                    </button>
                                    <button className="w-full text-left px-5 py-4 text-[#1e40af] hover:bg-[#e0f2fe] dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-bold">
                                        Language Settings
                                    </button>
                                    <button className="w-full text-left px-5 py-4 text-[#22c55e] hover:bg-[#e0f2fe] dark:hover:bg-[#223355] rounded-lg transition-all duration-200 font-bold">
                                        Audio Settings
                                    </button>
                                    <button className="w-full text-left px-5 py-4 text-[#64748b] dark:text-[#cfd8e3] hover:bg-[#e0f2fe] dark:hover:bg-[#223355] rounded-lg transition-all duration-200 flex items-center font-bold">
                                        <Settings className="mr-2" size={18} />
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
