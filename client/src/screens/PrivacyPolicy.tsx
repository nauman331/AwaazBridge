import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ShieldCheck, Eye, Lock, Users } from "lucide-react"

const PrivacyPolicy: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-8 h-8 text-[#22c55e]" />
                    <h1 className="text-3xl font-extrabold text-[#1e40af] dark:text-[#22c55e]">Privacy Policy</h1>
                </div>

                <div className="mb-6">
                    <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                        At AwazBridge, we are committed to protecting the privacy and security of our users who trust us with their voice communications.
                        This policy explains how we collect, use, and safeguard your voice data and personal information during translation services.
                    </p>
                    <p className="text-sm text-[#64748b] dark:text-[#94a3b8] italic">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-5 h-5 text-[#1e40af]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">Information We Collect</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li><strong>Account Information:</strong> Name, email address, profile picture, and user role (Regular User/Moderator)</li>
                            <li><strong>Voice Data:</strong> Audio recordings during translation sessions, language preferences, and voice patterns for accuracy</li>
                            <li><strong>Communication Data:</strong> Call metadata, session duration, translation logs, and quality feedback</li>
                            <li><strong>Usage Data:</strong> Platform interactions, feature usage, call frequency, and translation accuracy metrics</li>
                            <li><strong>Technical Data:</strong> IP address, device information, browser details, and connection quality for optimization</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-[#22c55e]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Provide real-time Urdu ↔ English voice translation with cultural context preservation</li>
                            <li>Enable seamless communication between Urdu and English speakers</li>
                            <li>Improve translation accuracy through machine learning and voice pattern analysis</li>
                            <li>Ensure platform security and prevent unauthorized access to voice communications</li>
                            <li>Develop new language features and enhance translation quality</li>
                            <li>Send important notifications about service updates and translation improvements</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-5 h-5 text-[#1e40af]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">Voice Data Protection & Security</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>All voice data is encrypted end-to-end during transmission and processing</li>
                            <li>Voice recordings are processed in real-time and automatically deleted after translation</li>
                            <li>We implement advanced security measures to protect against voice data breaches</li>
                            <li>Access to voice data is strictly limited to authorized translation algorithms only</li>
                            <li>We never sell voice data to third parties or use it for advertising purposes</li>
                            <li>Cultural context data is anonymized and used only for translation improvement</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Your Rights & Controls</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Access and download your voice data at any time</li>
                            <li>Correct or update your personal information through your profile settings</li>
                            <li>Delete your account and associated data (subject to record retention requirements)</li>
                            <li>Control privacy settings for your profile and translation activities</li>
                            <li>Opt out of non-essential communications while maintaining important service notifications</li>
                            <li>Request a copy of all data we have collected about you</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Educational Institution Access</h2>
                        <div className="bg-[#1e40af]/10 p-4 rounded-lg">
                            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                If you're part of an educational institution using AwazBridge, your school or organization may have
                                access to your educational data as part of their academic oversight responsibilities. This access
                                is governed by your institution's educational policies and applicable privacy laws.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Voice Data Retention</h2>
                        <div className="bg-[#1e40af]/10 p-4 rounded-lg">
                            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                Voice recordings are processed in real-time for translation and are not permanently stored.
                                Translation logs may be retained for up to 30 days for quality assurance and service improvement,
                                after which they are automatically deleted from our systems.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="mt-8 p-4 bg-white dark:bg-[#475569] rounded-lg border border-[#22c55e]/20">
                    <h3 className="font-semibold text-[#1e40af] mb-2">Questions About Privacy?</h3>
                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm mb-2">
                        We're committed to transparency in how we handle your voice data and personal information.
                        If you have any questions about this privacy policy, please contact us:
                    </p>
                    <p className="text-sm text-[#1e40af]">
                        Email: privacy@awazbridge.com | Phone: +92 (300) 123-4567
                    </p>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default PrivacyPolicy
