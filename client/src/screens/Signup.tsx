import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { User, Mail, Lock } from "lucide-react"
import Logo from "@/components/Logo"

const Signup: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col items-center">
                    {/* Branding */}
                    <Logo className="mb-6" />
                    <span className="font-black text-3xl text-[#FF6B00] dark:text-[#FF9F1C] tracking-tight mb-1">Sign Up</span>
                    <p className="text-sm text-center text-[#444] dark:text-[#cfd8e3] mt-1 mb-5">
                        Create your <span className="font-semibold text-[#FF6B00] dark:text-[#FF9F1C]">FinanceFire</span> account
                    </p>
                    {/* Form */}
                    <form className="space-y-4 w-full">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF9F1C]" />
                            <Input
                                type="text"
                                placeholder="Full Name"
                                className="pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg focus:ring-2 focus:ring-[#FF9F1C]/40 transition-all"
                                required
                                autoComplete="name"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF9F1C]" />
                            <Input
                                type="email"
                                placeholder="Email"
                                className="pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg focus:ring-2 focus:ring-[#FF9F1C]/40 transition-all"
                                required
                                autoComplete="email"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF9F1C]" />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="pl-10 bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg focus:ring-2 focus:ring-[#FF9F1C]/40 transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                            size="lg"
                        >
                            Sign Up
                        </Button>
                    </form>
                    {/* Divider */}
                    <div className="flex items-center w-full my-5">
                        <span className="flex-1 h-px bg-[#FF9F1C]/30 dark:bg-[#FF9F1C]/20"></span>
                        <span className="mx-3 text-muted-foreground text-xs font-medium">or</span>
                        <span className="flex-1 h-px bg-[#FF9F1C]/30 dark:bg-[#FF9F1C]/20"></span>
                    </div>
                    {/* Google Button */}
                    <Button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 bg-white border border-[#ddd] text-[#444] font-semibold shadow-sm hover:bg-[#f7f7f7] dark:bg-[#223355] dark:text-[#FF9F1C] dark:border-[#FF9F1C]/40 rounded-lg py-2 text-base"
                        size="lg"
                    // onClick={handleGoogleSignup}
                    >
                        {/* Google logo using Lucide's LogIn icon for demo, replace with Google logo if needed */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 mr-1">
                            <g>
                                <path fill="#4285F4" d="M31.68 16.364c0-1.09-.098-2.13-.28-3.13H16v5.93h8.7c-.37 2.01-1.48 3.72-3.16 4.86v4h5.1c2.98-2.75 4.74-6.8 4.74-11.66z" />
                                <path fill="#34A853" d="M16 32c4.32 0 7.95-1.43 10.6-3.89l-5.1-4c-1.42.95-3.23 1.52-5.5 1.52-4.23 0-7.82-2.86-9.1-6.7H1.7v4.21C4.34 28.36 9.74 32 16 32z" />
                                <path fill="#FBBC05" d="M6.9 19.93c-.34-1.01-.54-2.09-.54-3.21s.2-2.2.54-3.21v-4.21H1.7C.62 11.98 0 13.92 0 16c0 2.08.62 4.02 1.7 5.49l5.2-4.21z" />
                                <path fill="#EA4335" d="M16 6.36c2.35 0 4.46.81 6.12 2.39l4.59-4.59C23.95 1.43 20.32 0 16 0 9.74 0 4.34 3.64 1.7 8.51l5.2 4.21c1.28-3.84 4.87-6.7 9.1-6.7z" />
                            </g>
                        </svg>
                        Continue with Google
                    </Button>
                    {/* Already have account */}
                    <div className="flex justify-center mt-6 text-sm">
                        <span>Already have an account?</span>
                        <Link to="/login" className="ml-1 text-[#FF6B00] hover:underline font-semibold">Login</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Signup