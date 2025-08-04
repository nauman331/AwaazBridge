import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"

const ContactUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-4xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">Get in Touch</h1>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3] mb-6">
                        Have questions about EduFire? Need help getting started with your courses? Our education specialists are here to support you on your learning journey.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-6">Send us a Message</h2>
                        <form className="grid gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                                required
                            />
                            <select className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white">
                                <option value="">I am a...</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="parent">Parent</option>
                                <option value="institution">Institution Representative</option>
                                <option value="other">Other</option>
                            </select>
                            <select className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white">
                                <option value="">How can we help?</option>
                                <option value="technical">Technical Support</option>
                                <option value="billing">Billing Question</option>
                                <option value="course">Course Information</option>
                                <option value="feature">Feature Request</option>
                                <option value="partnership">Partnership Inquiry</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                placeholder="Tell us more about your question or feedback..."
                                rows={4}
                                className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                                required
                            />
                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
                                size="lg"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#FF6B00] dark:text-[#FF9F1C] mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-[#FF9F1C] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Our Office</h3>
                                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                        123 Education Blvd, Suite 456<br />
                                        Learning City, NY 10001<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-[#FF6B00] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Phone Support</h3>
                                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                        <a href="tel:+1234567890" className="hover:text-[#FF6B00] transition-colors">+1 (234) 567-890</a><br />
                                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                                        Saturday: 10:00 AM - 4:00 PM EST
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Mail className="w-6 h-6 text-[#FF9F1C] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Email Support</h3>
                                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                        General: <a href="mailto:support@edufire.com" className="hover:text-[#FF6B00] transition-colors">support@edufire.com</a><br />
                                        Technical: <a href="mailto:tech@edufire.com" className="hover:text-[#FF6B00] transition-colors">tech@edufire.com</a><br />
                                        Teachers: <a href="mailto:teachers@edufire.com" className="hover:text-[#FF6B00] transition-colors">teachers@edufire.com</a>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <MessageSquare className="w-6 h-6 text-[#FF6B00] mt-1" />
                                <div>
                                    <h3 className="font-semibold mb-1">Live Chat</h3>
                                    <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                        Available 24/7 for premium users<br />
                                        Monday - Friday: 9:00 AM - 9:00 PM EST for free users
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-[#FF6B00]/10 rounded-lg">
                            <h3 className="font-semibold text-[#FF6B00] mb-2">Response Time</h3>
                            <p className="text-[#444] dark:text-[#cfd8e3] text-sm">
                                We typically respond to all inquiries within 24 hours during business days.
                                Premium users receive priority support with response times under 4 hours.
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
