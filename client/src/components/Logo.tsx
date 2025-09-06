import React from "react"
import { cn } from "@/lib/utils"
import { Waves, Languages } from "lucide-react"

interface LogoProps {
    className?: string
}

const Logo: React.FC<LogoProps> = React.memo(({ className }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-lg flex items-center justify-center shadow-lg">
                <Waves className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full flex items-center justify-center">
                <Languages className="w-3 h-3 text-white" />
            </div>
        </div>
        <span className="font-black text-2xl text-[#1e40af] dark:text-[#22c55e] tracking-tight">
            AwazBridge
        </span>
    </div>
))

export default Logo
