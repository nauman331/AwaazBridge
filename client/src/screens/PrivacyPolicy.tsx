import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ShieldCheck, Eye, Lock, Users } from "lucide-react"

const PrivacyPolicy: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-8 h-8 text-[#FF9F1C]" />
                    <h1 className="text-3xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C]">Privacy Policy</h1>
                </div>

                <div className="mb-6">
                    <p className="text-[#444] dark:text-[#cfd8e3] mb-4">
                        At EduFire, we are committed to protecting the privacy and security of our students, teachers, and all users.
                        This policy explains how we collect, use, and safeguard your educational data and personal information.
                    </p>
                    <p className="text-sm text-[#444] dark:text-[#cfd8e3] italic">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Eye className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">Information We Collect</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li><strong>Account Information:</strong> Name, email address, profile picture, and educational role (student/teacher)</li>
                            <li><strong>Educational Data:</strong> Course enrollments, assignments, grades, learning progress, and academic achievements</li>
                            <li><strong>Communication Data:</strong> Messages, forum posts, video call recordings (with consent), and collaboration activities</li>
                            <li><strong>Usage Data:</strong> Platform interactions, session duration, feature usage, and learning analytics</li>
                            <li><strong>Technical Data:</strong> IP address, browser type, device information, and access logs for security purposes</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-[#FF9F1C]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">How We Use Your Information</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Provide personalized learning experiences and educational recommendations</li>
                            <li>Enable communication between students, teachers, and educational institutions</li>
                            <li>Track academic progress and generate performance analytics</li>
                            <li>Ensure platform security and prevent unauthorized access</li>
                            <li>Improve our educational tools and develop new learning features</li>
                            <li>Send important notifications about courses, assignments, and platform updates</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Lock className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">Data Protection & Security</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>All educational data is encrypted both in transit and at rest using industry-standard protocols</li>
                            <li>We implement multi-factor authentication and regular security audits</li>
                            <li>Student data is protected according to FERPA and COPPA compliance standards</li>
                            <li>Access to student information is strictly limited to authorized educational personnel</li>
                            <li>We never sell educational data to third parties or use it for advertising purposes</li>
                            <li>Regular backups ensure data recovery and business continuity</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Your Rights & Controls</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Access and download your educational data at any time</li>
                            <li>Correct or update your personal information through your profile settings</li>
                            <li>Delete your account and associated data (subject to educational record retention requirements)</li>
                            <li>Control privacy settings for your profile and learning activities</li>
                            <li>Opt out of non-essential communications while maintaining educational notifications</li>
                            <li>Request a copy of all data we have collected about you</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Educational Institution Access</h2>
                        <div className="bg-[#FF6B00]/10 p-4 rounded-lg">
                            <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                If you're part of an educational institution using EduFire, your school or organization may have
                                access to your educational data as part of their academic oversight responsibilities. This access
                                is governed by your institution's educational policies and applicable privacy laws.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Data Retention</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Educational records are retained according to academic institution policies</li>
                            <li>Account data is deleted within 30 days of account closure request</li>
                            <li>Communication data is retained for 2 years for quality assurance</li>
                            <li>Usage analytics are anonymized after 1 year and retained for platform improvement</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-8 p-4 bg-white dark:bg-[#223355] rounded-lg border border-[#FF9F1C]/20">
                    <h3 className="font-semibold text-[#FF6B00] mb-2">Questions About Privacy?</h3>
                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm mb-2">
                        We're committed to transparency in how we handle your educational data. If you have any questions
                        about this privacy policy or how your information is used, please contact us:
                    </p>
                    <p className="text-sm text-[#FF6B00]">
                        Email: privacy@edufire.com | Phone: +1 (234) 567-890
                    </p>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default PrivacyPolicy
