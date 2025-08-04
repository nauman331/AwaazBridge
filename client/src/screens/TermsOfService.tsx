import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { BookOpenText, GraduationCap, Shield, Users } from "lucide-react"

const TermsOfService: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpenText className="w-8 h-8 text-[#FF6B00]" />
                    <h1 className="text-3xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C]">Terms of Service</h1>
                </div>

                <div className="mb-6">
                    <p className="text-[#444] dark:text-[#cfd8e3] mb-4">
                        Welcome to EduFire! These terms govern your use of our educational platform and services.
                        By creating an account and using EduFire, you agree to comply with these terms and our community guidelines.
                    </p>
                    <p className="text-sm text-[#444] dark:text-[#cfd8e3] italic">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <GraduationCap className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">Educational Use</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>EduFire is designed exclusively for educational purposes and legitimate learning activities</li>
                            <li>Users must be at least 13 years old, or have parental consent if under 18</li>
                            <li>All content shared must be appropriate for an educational environment</li>
                            <li>Students and teachers must maintain professional conduct during all interactions</li>
                            <li>Academic integrity must be upheld - no cheating, plagiarism, or academic dishonesty</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-[#FF9F1C]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">User Responsibilities</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li><strong>Students:</strong> Attend classes regularly, complete assignments on time, participate respectfully in discussions</li>
                            <li><strong>Teachers:</strong> Provide quality educational content, maintain professional standards, protect student privacy</li>
                            <li><strong>All Users:</strong> Keep login credentials secure, report inappropriate behavior, respect intellectual property</li>
                            <li>Do not share accounts or allow unauthorized access to your profile</li>
                            <li>Respect the learning environment and other users' educational goals</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-5 h-5 text-[#FF6B00]" />
                            <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C]">Prohibited Activities</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Sharing inappropriate, offensive, or non-educational content</li>
                            <li>Disrupting classes or interfering with other users' learning experience</li>
                            <li>Attempting to hack, compromise, or gain unauthorized access to the platform</li>
                            <li>Using the platform for commercial purposes without authorization</li>
                            <li>Impersonating other users, teachers, or educational institutions</li>
                            <li>Violating copyright laws or sharing copyrighted material without permission</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Intellectual Property</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Course content created by teachers remains their intellectual property</li>
                            <li>Student work and submissions belong to the student (subject to institutional policies)</li>
                            <li>EduFire platform features and technology are protected by copyright and patent laws</li>
                            <li>Users may not reproduce, distribute, or modify platform content without permission</li>
                            <li>Fair use guidelines apply to educational materials shared on the platform</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Service Availability</h2>
                        <div className="bg-[#FF6B00]/10 p-4 rounded-lg mb-4">
                            <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                We strive to maintain 99.9% uptime and provide reliable access to educational resources.
                                However, we may need to perform maintenance, updates, or address technical issues that could
                                temporarily affect service availability.
                            </p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Scheduled maintenance will be announced in advance when possible</li>
                            <li>Emergency maintenance may occur without prior notice</li>
                            <li>We are not liable for educational disruptions due to technical issues beyond our control</li>
                            <li>Users should maintain offline backups of important educational materials</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Payment & Subscriptions</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Student accounts are free with basic features included</li>
                            <li>Teacher subscriptions are billed monthly or annually</li>
                            <li>Institutional licenses are available with custom pricing</li>
                            <li>Refunds are available within 14 days of subscription purchase</li>
                            <li>Cancellations take effect at the end of the current billing period</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Privacy & Data Protection</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>We comply with FERPA, COPPA, and GDPR requirements for educational data protection</li>
                            <li>Student privacy is our top priority in all platform features</li>
                            <li>Educational institutions may have access to student data as permitted by law</li>
                            <li>Users can request data deletion subject to educational record retention requirements</li>
                            <li>Detailed privacy practices are outlined in our Privacy Policy</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-3">Termination</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                            <li>Users may delete their accounts at any time through account settings</li>
                            <li>We reserve the right to suspend accounts for violations of these terms</li>
                            <li>Educational institutions may manage student account access</li>
                            <li>Upon termination, user data will be handled according to our Privacy Policy</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-8 p-4 bg-white dark:bg-[#223355] rounded-lg border border-[#FF9F1C]/20">
                    <h3 className="font-semibold text-[#FF6B00] mb-2">Questions About These Terms?</h3>
                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm mb-2">
                        If you have questions about these Terms of Service or need clarification about any policies,
                        please contact our support team:
                    </p>
                    <p className="text-sm text-[#FF6B00]">
                        Email: legal@edufire.com | Phone: +1 (234) 567-890
                    </p>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default TermsOfService
