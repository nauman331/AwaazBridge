import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

const ContactUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#1e40af] dark:text-[#22c55e] mb-4">Get in Touch</h1>
                    <p className="text-lg text-[#64748b] dark:text-[#94a3b8] mb-6">
                        Have questions about AwazBridge? Need help with voice translation? Our communication specialists are here to support you in bridging language barriers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-6">Send us a Message</h2>
                        <form className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="rounded px-4 py-3 border border-[#1e40af]/40 focus:outline-none focus:ring-2 focus:ring-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="rounded px-4 py-3 border border-[#1e40af]/40 focus:outline-none focus:ring-2 focus:ring-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white"
                                required
                            />
                            <select className="rounded px-4 py-3 border border-[#1e40af]/40 focus:outline-none focus:ring-2 focus:ring-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white">
                                <option value="">I am a...</option>
                                <option value="user">Regular User</option>
                                <option value="moderator">Moderator</option>
                                <option value="business">Business Representative</option>
                                <option value="developer">Developer</option>
                                <option value="other">Other</option>
                            </select>
                            <select className="rounded px-4 py-3 border border-[#1e40af]/40 focus:outline-none focus:ring-2 focus:ring-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white">
                                <option value="">How can we help?</option>
                                <option value="technical">Technical Support</option>
                                <option value="billing">Billing Question</option>
                                <option value="translation">Translation Issues</option>
                                <option value="feature">Feature Request</option>
                                <option value="partnership">Partnership Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                placeholder="Tell us about your voice translation needs or feedback..."
                                rows={4}
                                className="rounded px-4 py-3 border border-[#1e40af]/40 focus:outline-none focus:ring-2 focus:ring-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white"
                                required
                            />
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white border-0 shadow-lg hover:brightness-110"
                                size="lg"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#1e40af] dark:text-[#22c55e] mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#22c55e] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Our Offices</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                        Pakistan Office:<br />
                                        123 Bridge Avenue, Suite 456<br />
                                        Karachi, Pakistan<br /><br />
                                        USA Office:<br />
                                        789 Communication Blvd<br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-[#1e40af] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Phone Support</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                        <a href="tel:+923001234567" className="hover:text-[#1e40af] transition-colors">+92 (300) 123-4567</a><br />
                                        Monday - Friday: 9:00 AM - 6:00 PM PKT<br />
                                        Saturday: 10:00 AM - 4:00 PM PKT
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-[#22c55e] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Email Support</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                        General: <a href="mailto:support@awazbridge.com" className="hover:text-[#1e40af] transition-colors">support@awazbridge.com</a><br />
                                        Technical: <a href="mailto:tech@awazbridge.com" className="hover:text-[#1e40af] transition-colors">tech@awazbridge.com</a><br />
                                        Business: <a href="mailto:business@awazbridge.com" className="hover:text-[#1e40af] transition-colors">business@awazbridge.com</a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MessageSquare className="w-6 h-6 text-[#1d4ed8] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Live Chat</h3>
                                    <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                        Available 24/7 for Pro and Enterprise users<br />
                                        Monday - Friday: 9:00 AM - 9:00 PM PKT for free users
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-[#1e40af]/10 rounded-lg">
                            <h3 className="font-semibold text-[#1e40af] mb-2">Response Time</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8] text-sm">
                                We typically respond to all inquiries within 24 hours during business days.
                                Pro and Enterprise users receive priority support with response times under 4 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
)

export default ContactUs
