import React from "react"
import logo1 from "../assets/logo1.png"

const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <span className={`flex items-center ${className || ""}`}>
        <img src={logo1} alt="FinanceFire Logo" className="w-10 h-10" />
        <span className="font-bold text-xl tracking-tight text-[#002B5B] dark:text-white">FinanceFire</span>
    </span>
)

export default Logo
