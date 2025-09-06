import React from 'react'
import { Waves, Languages } from "lucide-react"

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-[#0f172a]">
            <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                    <Waves className="w-10 h-10 text-white animate-bounce" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full flex items-center justify-center animate-spin">
                    <Languages className="w-4 h-4 text-white" />
                </div>
            </div>
            <div className="text-2xl font-black text-[#1e40af] dark:text-[#22c55e] tracking-tight animate-pulse">
                AwazBridge
            </div>
            <div className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-2 animate-fade-in-out">
                Bridging voices worldwide...
            </div>
        </div>
    )
}

export default Loader