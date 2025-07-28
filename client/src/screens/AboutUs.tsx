import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Users, Rocket, ShieldCheck } from "lucide-react"

const AboutUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-3xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">About FinanceFire</h1>
                <p className="text-lg text-center text-[#444] dark:text-[#cfd8e3] mb-6">
                    FinanceFire is a modern fintech SaaS platform built to empower businesses of all sizes.
                    Our mission is to simplify financial operations, automate the boring stuff, and help you focus on what matters: growth.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="flex flex-col items-center">
                        <Users className="w-8 h-8 text-[#FF9F1C] mb-2" />
                        <span className="font-bold text-lg">Teamwork</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-center">Collaboration is at our core.</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Rocket className="w-8 h-8 text-[#FF6B00] mb-2" />
                        <span className="font-bold text-lg">Innovation</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-center">We build for the future.</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <ShieldCheck className="w-8 h-8 text-[#FF9F1C] mb-2" />
                        <span className="font-bold text-lg">Security</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-center">Your data is always safe.</span>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default AboutUs
