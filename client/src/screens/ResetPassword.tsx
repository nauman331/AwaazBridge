import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Lock } from "lucide-react"
import Logo from "@/components/Logo"

const ResetPassword: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col items-center">
                    <Logo className="mb-6" />
                    <h2 className="text-3xl font-extrabold text-center text-[#1e40af] dark:text-[#22c55e] mb-2">Reset Password</h2>
                    <p className="text-sm text-center text-[#64748b] dark:text-[#94a3b8] mb-6">
                        Enter and confirm your new password for AwazBridge.
                    </p>
                    <form className="space-y-4 w-full">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1e40af]" />
                            <Input
                                type="password"
                                placeholder="New Password"
                                className="pl-10 bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg focus:ring-2 focus:ring-[#1e40af]/40 transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1e40af]" />
                            <Input
                                type="password"
                                placeholder="Confirm New Password"
                                className="pl-10 bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg focus:ring-2 focus:ring-[#1e40af]/40 transition-all"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                            size="lg"
                        >
                            Set New Password
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ResetPassword