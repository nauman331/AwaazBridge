import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Users, Rocket, ShieldCheck, GraduationCap, BookOpen, Video } from "lucide-react"

const AboutUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">About EduFire</h1>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3] mb-6">
                        EduFire is a revolutionary educational platform that transforms the way students learn and teachers educate.
                        We bridge the gap between traditional classroom learning and modern digital education through innovative technology and user-centric design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">Our Mission</h2>
                        <p className="text-[#444] dark:text-[#cfd8e3]">
                            To democratize quality education by providing accessible, interactive, and engaging learning experiences
                            that empower students and educators worldwide to achieve their full potential.
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">Our Vision</h2>
                        <p className="text-[#444] dark:text-[#cfd8e3]">
                            To become the world's leading educational platform that makes learning enjoyable, effective,
                            and accessible to everyone, regardless of their location or background.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#223355] rounded-lg">
                        <GraduationCap className="w-12 h-12 text-[#FF6B00] mb-4" />
                        <span className="font-bold text-lg mb-2">Student-Centered</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-sm">Designed with students' learning needs at the core of everything we do.</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#223355] rounded-lg">
                        <BookOpen className="w-12 h-12 text-[#FF9F1C] mb-4" />
                        <span className="font-bold text-lg mb-2">Innovative Learning</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-sm">Cutting-edge tools and features that make learning interactive and engaging.</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#223355] rounded-lg">
                        <Video className="w-12 h-12 text-[#FF6B00] mb-4" />
                        <span className="font-bold text-lg mb-2">Connected Community</span>
                        <span className="text-[#444] dark:text-[#cfd8e3] text-sm">Building bridges between students and teachers through technology.</span>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-6">Why Choose EduFire?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="flex items-start gap-3">
                            <Users className="w-6 h-6 text-[#FF9F1C] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Collaborative Learning</h3>
                                <p className="text-sm text-[#444] dark:text-[#cfd8e3]">Foster teamwork and peer-to-peer learning with our advanced collaboration tools.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Rocket className="w-6 h-6 text-[#FF6B00] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Cutting-Edge Technology</h3>
                                <p className="text-sm text-[#444] dark:text-[#cfd8e3]">Stay ahead with the latest educational technology and learning methodologies.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-6 h-6 text-[#FF9F1C] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Secure & Reliable</h3>
                                <p className="text-sm text-[#444] dark:text-[#cfd8e3]">Your data and privacy are protected with enterprise-grade security measures.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <GraduationCap className="w-6 h-6 text-[#FF6B00] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Proven Results</h3>
                                <p className="text-sm text-[#444] dark:text-[#cfd8e3]">Join thousands of successful students and educators who trust EduFire.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default AboutUs
