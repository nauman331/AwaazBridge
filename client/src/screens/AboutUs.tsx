import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Users, Rocket, ShieldCheck, Languages, Waves, Video } from "lucide-react"

const AboutUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#1e40af] dark:text-[#22c55e] mb-4">About AwazBridge</h1>
                    <p className="text-lg text-[#64748b] dark:text-[#94a3b8] mb-6">
                        AwazBridge is a revolutionary voice translation platform that transforms the way Urdu and English speakers communicate.
                        We bridge language barriers through real-time voice translation while preserving cultural context and emotional nuance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-4">Our Mission</h2>
                        <p className="text-[#64748b] dark:text-[#94a3b8]">
                            To eliminate language barriers between Urdu and English speakers worldwide by providing seamless, culturally-aware voice translation that preserves meaning, context, and human connection in every conversation.
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-4">Our Vision</h2>
                        <p className="text-[#64748b] dark:text-[#94a3b8]">
                            To become the world's leading voice translation platform that connects cultures, builds bridges between communities, and makes authentic communication possible across language boundaries.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#475569] rounded-lg">
                        <Languages className="w-12 h-12 text-[#1e40af] mb-4" />
                        <span className="font-bold text-lg mb-2">Cultural Intelligence</span>
                        <span className="text-[#64748b] dark:text-[#94a3b8] text-sm">Preserving cultural context and nuances in every translation.</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#475569] rounded-lg">
                        <Waves className="w-12 h-12 text-[#22c55e] mb-4" />
                        <span className="font-bold text-lg mb-2">Real-time Translation</span>
                        <span className="text-[#64748b] dark:text-[#94a3b8] text-sm">Instant voice translation with minimal latency for natural conversations.</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#475569] rounded-lg">
                        <Video className="w-12 h-12 text-[#1e40af] mb-4" />
                        <span className="font-bold text-lg mb-2">Connected Community</span>
                        <span className="text-[#64748b] dark:text-[#94a3b8] text-sm">Building bridges between Urdu and English speaking communities.</span>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-6">Why Choose AwazBridge?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="flex items-start gap-3">
                            <Users className="w-6 h-6 text-[#22c55e] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Multi-Participant Support</h3>
                                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Connect multiple Urdu and English speakers in seamless group conversations.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Rocket className="w-6 h-6 text-[#1e40af] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Advanced AI Technology</h3>
                                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">State-of-the-art voice recognition trained specifically on Urdu dialects and English accents.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-6 h-6 text-[#22c55e] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Secure & Private</h3>
                                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">End-to-end encryption ensures your conversations remain private and secure.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Languages className="w-6 h-6 text-[#1e40af] mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold mb-1">Cultural Context</h3>
                                <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Beyond translation—we understand and preserve cultural expressions and idioms.</p>
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
