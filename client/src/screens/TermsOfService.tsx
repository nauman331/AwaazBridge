import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { BookOpenText, Languages, Shield, Users } from "lucide-react"

const TermsOfService: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-6">
                    <BookOpenText className="w-8 h-8 text-[#1e40af]" />
                    <h1 className="text-3xl font-extrabold text-[#1e40af] dark:text-[#22c55e]">Terms of Service</h1>
                </div>

                <div className="mb-6">
                    <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                        Welcome to AwazBridge! These terms govern your use of our voice translation platform and services.
                        By creating an account and using AwazBridge, you agree to comply with these terms and our community guidelines.
                    </p>
                    <p className="text-sm text-[#64748b] dark:text-[#94a3b8] italic">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>

                <div className="space-y-8">
                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Languages className="w-5 h-5 text-[#1e40af]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">Voice Translation Use</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>AwazBridge is designed exclusively for legitimate voice communication and translation purposes</li>
                            <li>Users must be at least 13 years old, or have parental consent if under 18</li>
                            <li>All conversations must be appropriate for a professional communication environment</li>
                            <li>Users must maintain respectful conduct during all voice interactions</li>
                            <li>Language accuracy and cultural sensitivity must be upheld in all translations</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5 text-[#22c55e]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">User Responsibilities</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li><strong>Regular Users:</strong> Use translation services responsibly, respect other participants, maintain audio quality</li>
                            <li><strong>Moderators:</strong> Provide quality support, maintain professional standards, protect user privacy</li>
                            <li><strong>All Users:</strong> Keep login credentials secure, report inappropriate behavior, respect intellectual property</li>
                            <li>Do not share accounts or allow unauthorized access to your profile</li>
                            <li>Respect the communication environment and other users' translation needs</li>
                        </ul>
                    </section>

                    <section>
                        <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-5 h-5 text-[#1e40af]" />
                            <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e]">Prohibited Activities</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Sharing inappropriate, offensive, or harmful content during voice calls</li>
                            <li>Disrupting calls or interfering with other users' communication experience</li>
                            <li>Attempting to hack, compromise, or gain unauthorized access to the platform</li>
                            <li>Using the platform for commercial purposes without authorization</li>
                            <li>Impersonating other users or misrepresenting your identity</li>
                            <li>Recording conversations without explicit consent from all participants</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Intellectual Property</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>All content and materials provided on the AwazBridge platform are owned by AwazBridge or its licensors</li>
                            <li>Users retain ownership of their original content but grant AwazBridge a license to use, reproduce, and distribute as necessary for the service</li>
                            <li>Unauthorized use, reproduction, or distribution of AwazBridge content is prohibited</li>
                            <li>Infringement of intellectual property rights may result in account suspension or legal action</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Service Availability</h2>
                        <div className="bg-[#1e40af]/10 p-4 rounded-lg mb-4">
                            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                We strive to maintain 99.9% uptime and provide reliable access to translation services.
                                However, we may need to perform maintenance, updates, or address technical issues that could
                                temporarily affect service availability.
                            </p>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Scheduled maintenance will be announced in advance when possible</li>
                            <li>Emergency maintenance may occur without prior notice</li>
                            <li>We are not liable for disruptions to translation services due to technical issues beyond our control</li>
                            <li>Users should maintain offline backups of important data and materials</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Payment & Subscriptions</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Basic translation services are free for all users</li>
                            <li>Premium features and services are available through subscription plans</li>
                            <li>Institutional and enterprise solutions are available with custom pricing</li>
                            <li>Refunds for subscription fees are available within 14 days of purchase</li>
                            <li>Cancellations take effect at the end of the current billing period</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Voice Data & Privacy</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Voice recordings are processed in real-time and not stored permanently</li>
                            <li>Translation data is encrypted and handled according to privacy standards</li>
                            <li>Users have control over their voice data and can request deletion</li>
                            <li>We comply with international data protection regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-3">Termination</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[#64748b] dark:text-[#94a3b8]">
                            <li>Users may delete their accounts at any time through account settings</li>
                            <li>We reserve the right to suspend accounts for violations of these terms</li>
                            <li>Upon termination, user data will be handled according to our Privacy Policy</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-8 p-4 bg-white dark:bg-[#475569] rounded-lg border border-[#22c55e]/20">
                    <h3 className="font-semibold text-[#1e40af] mb-2">Questions About These Terms?</h3>
                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm mb-2">
                        If you have questions about these Terms of Service or need clarification about any policies,
                        please contact our support team:
                    </p>
                    <p className="text-sm text-[#1e40af]">
                        Email: legal@awazbridge.com | Phone: +92 (300) 123-4567
                    </p>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default TermsOfService;
