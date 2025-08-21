import React, { useState, useEffect } from 'react'
import { User, BookOpen, Calendar, Edit, Settings, Users, Book, Star } from 'lucide-react'
import useFetch from '@/hooks/useFetch'
import useSubmit from '@/hooks/useSubmit'
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Loader from '@/components/Loader';
import { useDispatch } from 'react-redux';
import { setUserdata } from "../../store/slices/authSlice"

type ProfileFormData = {
    name: string;
    email: string;
    phone: string;
    specialization: string;
    department: string;
    experience: number;
}

const Profile: React.FC = () => {
    const dispatch = useDispatch();
    const { isPending, error, data: userdata, refetch } = useFetch('auth/profile', true, "profile");
    const { isPending: isSubmitting, error: submitError, mutate, isSuccess, data } = useSubmit('auth/profile', true, "updateprofile", "PUT");
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<ProfileFormData>();
    const [isEditing, setIsEditing] = useState<boolean>(false)

    // Set form values when userdata is loaded
    useEffect(() => {
        if (userdata) {
            setValue('name', userdata.name || '');
            setValue('email', userdata.email || '');
            setValue('phone', userdata.phone || '');
            setValue('specialization', userdata.specialization || '');
            setValue('department', userdata.department || '');
            setValue('experience', userdata.experience || 0);
        }
    }, [userdata, setValue]);

    // Handle successful update
    useEffect(() => {
        if (isSuccess) {
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            refetch(); // Refresh the profile data
        }
        if (submitError) {
            toast.error(submitError.message || "Failed to update profile. Please try again.");
        }
    }, [isSuccess, submitError, refetch]);

    const handleUpdateProfile: SubmitHandler<ProfileFormData> = async (formData) => {
        mutate(formData);
        if (isSuccess) {
            dispatch(setUserdata(data));
        }
    }

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form to original values
        if (userdata) {
            reset({
                name: userdata.name || '',
                email: userdata.email || '',
                phone: userdata.phone || '',
                specialization: userdata.specialization || '',
                department: userdata.department || '',
                experience: userdata.experience || 0
            });
        }
    }

    if (isPending) {
        return <Loader />
    }
    if (error) {
        return <p className='text-red-500'>Error in getting Profile Refresh!</p>
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
                                    <p className="text-green-100 text-lg">{userdata?.role || "Teacher"}</p>
                                    <p className="text-sm text-green-200">ID: {userdata?.googleId || ""}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    if (isEditing) {
                                        handleCancel();
                                    } else {
                                        setIsEditing(true);
                                    }
                                }}
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

                                <form onSubmit={handleSubmit(handleUpdateProfile)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Full Name</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("name", { required: "Name is required" })}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all ${errors.name ? 'border-red-500' : 'border-green-300'}`}
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.name || ""}</p>
                                            )}
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Email</label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all ${errors.email ? 'border-red-500' : 'border-green-300'}`}
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.email || ""}</p>
                                            )}
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Phone</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    {...register("phone")}
                                                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.phone || "Not provided"}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Department</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("department")}
                                                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.department || "Not specified"}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Specialization</label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register("specialization")}
                                                    className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all"
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.specialization || "Not specified"}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#002B5B] dark:text-[#e0e6ef] mb-2">Experience (Years)</label>
                                            {isEditing ? (
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="50"
                                                    {...register("experience", {
                                                        valueAsNumber: true,
                                                        min: { value: 0, message: "Experience cannot be negative" },
                                                        max: { value: 50, message: "Experience cannot exceed 50 years" }
                                                    })}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white transition-all ${errors.experience ? 'border-red-500' : 'border-green-300'}`}
                                                />
                                            ) : (
                                                <p className="text-[#002B5B] dark:text-white py-3 font-medium">{userdata?.experience ? `${userdata.experience} years` : "Not specified"}</p>
                                            )}
                                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                                        </div>
                                    </div>
                                    {isEditing && (
                                        <div className="mt-6 pt-4 border-t border-green-200 flex gap-3">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-lg hover:brightness-110 transition-all duration-200 font-medium shadow-lg disabled:opacity-50"
                                            >
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-medium shadow-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </form>
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