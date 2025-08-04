import React from "react"
import { GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
}

const Logo: React.FC<LogoProps> = React.memo(({ className }) => (
    <div className={cn("flex items-center gap-2", className)}>
        <GraduationCap className="w-8 h-8 text-[#FF6B00]" />
        <span className="font-black text-2xl text-[#FF6B00] dark:text-[#FF9F1C] tracking-tight">
            EduFire
        </span>
    </div>
))

export default Logo
