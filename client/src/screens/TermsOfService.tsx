import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { BookOpenText } from "lucide-react"

const TermsOfService: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-3xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <BookOpenText className="w-8 h-8 text-[#FF6B00]" />
                    <h1 className="text-3xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C]">Terms of Service</h1>
                </div>
                <p className="text-[#444] dark:text-[#cfd8e3] mb-4">
                    By using FinanceFire, you agree to the following terms and conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                    <li>Use the service responsibly and legally.</li>
                    <li>Do not attempt to breach our security or misuse the platform.</li>
                    <li>We reserve the right to update these terms at any time.</li>
                    <li>Contact support for any questions regarding these terms.</li>
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                    For full details, email legal@financefire.com.
                </p>
            </div>
        </main>
        <Footer />
    </div>
)

export default TermsOfService
