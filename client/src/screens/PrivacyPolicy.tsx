import React from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ShieldCheck } from "lucide-react"

const PrivacyPolicy: React.FC = () => (
    <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
        <Navbar />
        <main className="flex flex-1 items-center justify-center py-16 px-4">
            <div className="max-w-3xl w-full bg-[#FFF7F0] dark:bg-[#112244] rounded-2xl shadow-2xl p-10 border border-[#FF9F1C]/30 dark:border-[#FF9F1C]/20 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#FF9F1C]" />
                    <h1 className="text-3xl font-extrabold text-[#FF6B00] dark:text-[#FF9F1C]">Privacy Policy</h1>
                </div>
                <p className="text-[#444] dark:text-[#cfd8e3] mb-4">
                    Your privacy is important to us. This policy explains how FinanceFire collects, uses, and protects your information.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#444] dark:text-[#cfd8e3]">
                    <li>We never sell your data to third parties.</li>
                    <li>All data is encrypted and stored securely.</li>
                    <li>We only collect data necessary for providing our services.</li>
                    <li>You can request data deletion at any time.</li>
                </ul>
                <p className="mt-6 text-sm text-muted-foreground">
                    For more details, contact us at privacy@financefire.com.
                </p>
            </div>
        </main>
        <Footer />
    </div>
)

export default PrivacyPolicy
