import React from "react"
import { cn } from "@/lib/utils"
import logo from "../assets/logo1.png"

interface LogoProps {
    className?: string
}

const Logo: React.FC<LogoProps> = React.memo(({ className }) => (
    <div className={cn("flex items-center", className)}>
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="font-black text-2xl text-[#002B5B] dark:text-[#FF9F1C] tracking-tight">
            EduFire
        </span>
    </div>
))

export default Logo
