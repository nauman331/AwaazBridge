import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { User, Mail, Lock, Globe, MessageCircle } from "lucide-react"
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
    password: string;
    language: "en" | "ur";
}


const Signup: React.FC = () => {
    const { mutate, isPending, error, data, isSuccess } = useSubmit('auth/register', false, 'register');
    const { mutate: googleLogin, isPending: isGoogleLoginPending, error: googleLoginError, data: googleLoginData, isSuccess: isGoogleLoginSuccess } = useSubmit('auth/google-login', false, 'google-login');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ur" | "">("");

    const handleRegister: SubmitHandler<FormData> = async (formData) => {
        if (selectedLanguage) {
            mutate({ ...formData, language: selectedLanguage });
        } else {
            toast.error("Please select a language first.");
        }
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast.success("Registration successful! Welcome.");
            dispatch(setToken(data.token));
            navigate(RoleNavigation("User"));
        }
        if (error) {
            toast.error(error.message || "Registration failed. Please try again.");
        }
    }, [isSuccess, data, error, dispatch, navigate]);


    const handleLanguageSelect = (language: "en" | "ur") => {
        setSelectedLanguage(language);
    }

    const doGoogleLogin = useGoogleLogin({
        onSuccess: (response) => {
            if (selectedLanguage) {
                googleLogin({ access_token: response.access_token, language: selectedLanguage });
            } else {
                toast.error("Please select a language before signing in with Google.");
            }
        },
        onError: () => {
            toast.error("Google login failed. Please try again.");
        }
    });

    const handleGoogleLogin = () => {
        if (!selectedLanguage) {
            toast.error("Please select a language first.");
            return;
        }
        doGoogleLogin();
    }

    useEffect(() => {
        if (isGoogleLoginSuccess && googleLoginData) {
            toast.success("Google login successful! Welcome.");
            dispatch(setToken(googleLoginData.token));
            navigate(RoleNavigation(googleLoginData.role));
        }
        if (googleLoginError) {
            toast.error(googleLoginError.message || "Google login failed. Please try again.");
        }
    }, [isGoogleLoginSuccess, googleLoginData, googleLoginError, dispatch, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col items-center">
                    <Logo className="mb-6" />
                    <span className="font-black text-3xl text-[#1e40af] dark:text-[#22c55e] tracking-tight mb-1">Join AwazBridge</span>
                    <p className="text-sm text-center text-[#64748b] dark:text-[#94a3b8] mt-1 mb-5">
                        Start bridging languages with <span className="font-semibold text-[#1e40af] dark:text-[#22c55e]">AwazBridge</span>
                    </p>

                    {/* Language Selection */}
                    {!selectedLanguage && (
                        <div className="w-full mb-6">
                            <h3 className="text-lg font-semibold text-center mb-4 text-[#1f2937] dark:text-white">Choose Your Language</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleLanguageSelect("en")}
                                    className="flex flex-col items-center p-4 border-2 border-[#1e40af]/40 rounded-lg hover:border-[#1e40af] hover:bg-[#1e40af]/5 transition-all"
                                >
                                    <Globe className="w-8 h-8 text-[#1e40af] mb-2" />
                                    <span className="font-semibold text-[#1f2937] dark:text-white">English</span>
                                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] text-center">I speak English</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleLanguageSelect("ur")}
                                    className="flex flex-col items-center p-4 border-2 border-[#22c55e]/40 rounded-lg hover:border-[#22c55e] hover:bg-[#22c55e]/5 transition-all"
                                >
                                    <MessageCircle className="w-8 h-8 text-[#22c55e] mb-2" />
                                    <span className="font-semibold text-[#1f2937] dark:text-white">اردو</span>
                                    <span className="text-xs text-[#64748b] dark:text-[#94a3b8] text-center">میں اردو بولتا ہوں</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Show selected language */}
                    {selectedLanguage && (
                        <div className="w-full mb-4 p-3 bg-[#1e40af]/10 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {selectedLanguage === "en" ? (
                                    <Globe className="w-5 h-5 text-[#1e40af]" />
                                ) : (
                                    <MessageCircle className="w-5 h-5 text-[#1e40af]" />
                                )}
                                <span className="text-sm font-medium text-[#1e40af]">
                                    Language: {selectedLanguage === "en" ? "English" : "اردو"}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedLanguage("")}
                                className="text-xs text-[#1e40af] hover:underline"
                            >
                                Change
                            </button>
                        </div>
                    )}

                    {/* Form */}
                    {selectedLanguage && (
                        <>
                            <form
                                onSubmit={handleSubmit(handleRegister)}
                                className="space-y-4 w-full">
                                <div className="relative">
                                    <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.name ? 'text-red-500' : 'text-[#1e40af]'}`} />
                                    <Input
                                        type="text"
                                        placeholder={errors.name ? errors.name.message : "Full Name"}
                                        style={{ border: errors.name && "2px solid red" }}
                                        {...register("name", { required: "Name is required" })}
                                        className={`pl-10 bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg transition-all ${errors.name ? 'placeholder:text-red-500' : ''}`} />
                                </div>
                                <div className="relative">
                                    <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.email ? 'text-red-500' : 'text-[#1e40af]'}`} />
                                    <Input
                                        type="email"
                                        placeholder={errors.email ? errors.email.message : "Email"}
                                        style={{ border: errors.email && "2px solid red" }}
                                        {...register("email", { required: "Email is required" })}
                                        className={`pl-10 bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg transition-all ${errors.email ? 'placeholder:text-red-500' : ''}`}
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${errors.password ? 'text-red-500' : 'text-[#1e40af]'}`} />
                                    <Input
                                        type="password"
                                        placeholder={errors.password ? errors.password.message : "Password"}
                                        style={{ border: errors.password && "2px solid red" }}
                                        {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                        className={`pl-10 bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg transition-all ${errors.password ? 'placeholder:text-red-500' : ''}`}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                                    size="lg"
                                    disabled={isPending}
                                >
                                    {isPending ? "Joining..." : "Join AwazBridge"}
                                </Button>
                            </form>

                            <div className="flex items-center w-full my-5">
                                <span className="flex-1 h-px bg-[#1e40af]/30 dark:bg-[#22c55e]/20"></span>
                                <span className="mx-3 text-muted-foreground text-xs font-medium">or</span>
                                <span className="flex-1 h-px bg-[#1e40af]/30 dark:bg-[#22c55e]/20"></span>
                            </div>

                            <Button
                                onClick={handleGoogleLogin}
                                type="button"
                                className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white border border-[#ddd] text-[#444] font-semibold shadow-sm hover:bg-[#f7f7f7] dark:bg-[#334155] dark:text-[#22c55e] dark:border-[#22c55e]/40 rounded-lg py-2 text-base"
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
                        <Link to="/login" className="ml-1 text-[#1e40af] hover:underline font-semibold">Sign In</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Signup