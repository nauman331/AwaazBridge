import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Logo from "@/components/Logo"

const OtpVerification: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col items-center">
                    {/* Branding */}
                    <Logo className="mb-6" />
                    <h2 className="text-3xl font-extrabold text-center text-[#FF6B00] dark:text-[#FF9F1C] mb-2">Enter OTP</h2>
                    <p className="text-sm text-center text-[#444] dark:text-[#cfd8e3] mb-6">
                        Enter the one-time password sent to your email.
                    </p>
                    <form className="space-y-4 w-full">
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            className="bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white border border-[#FF9F1C]/40 dark:border-[#FF9F1C]/30 rounded-lg focus:ring-2 focus:ring-[#FF9F1C]/40 transition-all"
                            required
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                            size="lg"
                        >
                            Verify OTP
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default OtpVerification
