import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const ContactUs: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C] mb-4">Contact Us</h1>
                <p className="text-lg text-center text-[#444] dark:text-[#cfd8e3] mb-6">
                    Have questions or want a custom demo? Reach out and our team will get back to you within 1 business day.
                </p>
                <form className="grid gap-4 w-full">
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
                    <textarea
                        placeholder="How can we help?"
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
        </main>
        <Footer />
    </div>
)

export default ContactUs
