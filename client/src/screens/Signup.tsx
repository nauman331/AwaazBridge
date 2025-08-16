import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { User, Mail, Lock, GraduationCap, Users, Phone } from "lucide-react"
import Logo from "@/components/Logo"
import { useGoogleLogin } from '@react-oauth/google';
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setToken } from "../store/slices/authSlice"
import useSubmit from "@/hooks/useSubmit"
import { RoleNavigation } from "../utils/Role"

type FormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "Student" | "Teacher";
}


const Signup: React.FC = () => {
    const { mutate, isPending, error, data, isSuccess } = useSubmit('auth/register', false, 'register');
    const { mutate: googleLogin, isPending: isGoogleLoginPending, error: googleLoginError, data: googleLoginData, isSuccess: isGoogleLoginSuccess } = useSubmit('auth/google-login', false, 'google-login');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedRole, setSelectedRole] = useState<"Student" | "Teacher" | "">("");

    const handleRegister: SubmitHandler<FormData> = async (formData) => {
        if (selectedRole) {
            mutate({ ...formData, role: selectedRole });
        } else {
            toast.error("Please select a role first.");
        }
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast.success("Registration successful! Welcome.");
            dispatch(setToken(data.token));
            navigate(RoleNavigation(selectedRole));
        }
        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    }, [isSuccess, data, error, dispatch, navigate]);


    const handleRoleSelect = (role: "Student" | "Teacher") => {
        setSelectedRole(role);
    }

    const doGoogleLogin = useGoogleLogin({
        onSuccess: (response) => {
            if (selectedRole) {
                googleLogin({ access_token: response.access_token, role: selectedRole });
            } else {
                toast.error("Please select a role before signing in with Google.");
            }
        },
        onError: () => {
            toast.error("Google login failed. Please try again.");
        }
    });

    const handleGoogleLogin = () => {
        if (!selectedRole) {
            toast.error("Please select a role first.");
            return;
        }
        doGoogleLogin();
    }

    useEffect(() => {
        if (isGoogleLoginSuccess && googleLoginData) {
            toast.success("Google login successful! Welcome.");
            dispatch(setToken(googleLoginData.token));
            navigate('/');
        }
        if (googleLoginError) {
            toast.error(googleLoginError.message || "Google login failed. Please try again.");
        }
    }, [isGoogleLoginSuccess, googleLoginData, googleLoginError, dispatch, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col items-center">
                    <Logo className="mb-6" />
                    <span className="font-black text-3xl text-[#FF6B00] dark:text-[#FF9F1C] tracking-tight mb-1">Join EduFire</span>
                    <p className="text-sm text-center text-[#444] dark:text-[#cfd8e3] mt-1 mb-5">
                        Create your <span className="font-semibold text-[#FF6B00] dark:text-[#FF9F1C]">EduFire</span> account
                    </p>

                    {/* Role Selection */}
                    {!selectedRole && (
                        <div className="w-full mb-6">
                            <h3 className="text-lg font-semibold text-center mb-4 text-[#002B5B] dark:text-white">Choose Your Role</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect("Student")}
                                    className="flex flex-col items-center p-4 border-2 border-[#FF9F1C]/40 rounded-lg hover:border-[#FF6B00] hover:bg-[#FF6B00]/5 transition-all"
                                >
                                    <GraduationCap className="w-8 h-8 text-[#FF6B00] mb-2" />
                                    <span className="font-semibold text-[#002B5B] dark:text-white">Student</span>
                                    <span className="text-xs text-[#444] dark:text-[#cfd8e3] text-center">Join classes & learn</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRoleSelect("Teacher")}
                                    className="flex flex-col items-center p-4 border-2 border-[#FF9F1C]/40 rounded-lg hover:border-[#FF6B00] hover:bg-[#FF6B00]/5 transition-all"
                                >
                                    <Users className="w-8 h-8 text-[#FF9F1C] mb-2" />
                                    <span className="font-semibold text-[#002B5B] dark:text-white">Teacher</span>
                                    <span className="text-xs text-[#444] dark:text-[#cfd8e3] text-center">Create & teach courses</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Show selected role */}
                    {selectedRole && (
                        <div className="w-full mb-4 p-3 bg-[#FF6B00]/10 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {selectedRole === "Student" ? (
                                    <GraduationCap className="w-5 h-5 text-[#FF6B00]" />
                                ) : (
                                    <Users className="w-5 h-5 text-[#FF6B00]" />
                                )}
                                <span className="text-sm font-medium text-[#FF6B00]">
                                    Signing up as {selectedRole}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedRole("")}
                                className="text-xs text-[#FF6B00] hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    {selectedRole && (
                        <>
                            <form
                                onSubmit={handleSubmit(handleRegister)}
                                className="space-y-4 w-full">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.name ? 'text-red-500' : 'text-[#FF9F1C]'}`} />
                                    <Input
                                        type="text"
                                        placeholder={errors.name ? errors.name.message : "Full Name"}
                                        style={{ border: errors.name && "2px solid red" }}
                                        {...register("name", { required: "Name is required" })}
                                        className={`pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg transition-all ${errors.name ? 'placeholder:text-red-500' : ''}`} />
                                </div>
                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-[#FF9F1C]'}`} />
                                    <Input
                                        type="email"
                                        placeholder={errors.email ? errors.email.message : "Email"}
                                        style={{ border: errors.email && "2px solid red" }}
                                        {...register("email", { required: "Email is required" })}
                                        className={`pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg transition-all ${errors.email ? 'placeholder:text-red-500' : ''}`}
                                    />
                                </div>
                                <div className="relative">
                                    <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.phone ? 'text-red-500' : 'text-[#FF9F1C]'}`} />
                                    <Input
                                        type="tel"
                                        placeholder={errors.phone ? errors.phone.message : "Phone"}
                                        style={{ border: errors.phone && "2px solid red" }}
                                        {...register("phone", { required: "Phone number is required" })}
                                        className={`pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg transition-all ${errors.phone ? 'placeholder:text-red-500' : ''}`}
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.password ? 'text-red-500' : 'text-[#FF9F1C]'}`} />
                                    <Input
                                        type="password"
                                        placeholder={errors.password ? errors.password.message : "Password"}
                                        style={{ border: errors.password && "2px solid red" }}
                                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                        className={`pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg transition-all ${errors.password ? 'placeholder:text-red-500' : ''}`}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                                    size="lg"
                                    disabled={isPending}
                                >
                                    {isPending ? "Joining..." : `Join as ${selectedRole}`}
                                </Button>
                            </form>

                            <div className="flex items-center w-full my-5">
                                <span className="flex-1 h-px bg-[#FF9F1C]/30 dark:bg-[#FF9F1C]/20"></span>
                                <span className="mx-3 text-muted-foreground text-xs font-medium">or</span>
                                <span className="flex-1 h-px bg-[#FF9F1C]/30 dark:bg-[#FF9F1C]/20"></span>
                            </div>

                            <Button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white border border-[#ddd] text-[#444] font-semibold shadow-sm hover:bg-[#f7f7f7] dark:bg-[#223355] dark:text-[#FF9F1C] dark:border-[#FF9F1C]/40 rounded-lg py-2 text-base"
                                size="lg"
                                disabled={isGoogleLoginPending}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 mr-1">
                                    <g>
                                        <path fill="#4285F4" d="M31.68 16.364c0-1.09-.098-2.13-.28-3.13H16v5.93h8.7c-.37 2.01-1.48 3.72-3.16 4.86v4h5.1c2.98-2.75 4.74-6.8 4.74-11.66z" />
                                        <path fill="#34A853" d="M16 32c4.32 0 7.95-1.43 10.6-3.89l-5.1-4c-1.42.95-3.23 1.52-5.5 1.52-4.23 0-7.82-2.86-9.1-6.7H1.7v4.21C4.34 28.36 9.74 32 16 32z" />
                                        <path fill="#FBBC05" d="M6.9 19.93c-.34-1.01-.54-2.09-.54-3.21s.2-2.2.54-3.21v-4.21H1.7C.62 11.98 0 13.92 0 16c0 2.08.62 4.02 1.7 5.49l5.2-4.21z" />
                                        <path fill="#EA4335" d="M16 6.36c2.35 0 4.46.81 6.12 2.39l4.59-4.59C23.95 1.43 20.32 0 16 0 9.74 0 4.34 3.64 1.7 8.51l5.2 4.21c1.28-3.84 4.87-6.7 9.1-6.7z" />
                                    </g>
                                </svg>
                                {isGoogleLoginPending ? "Signing in..." : "Continue with Google"}
                            </Button>
                        </>
                    )}

                    <div className="flex justify-center mt-6 text-sm">
                        <span>Already have an account?</span>
                        <Link to="/login" className="ml-1 text-[#FF6B00] hover:underline font-semibold">Sign In</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Signup