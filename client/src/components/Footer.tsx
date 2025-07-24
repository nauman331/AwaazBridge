import * as React from "react"

const Footer: React.FC = () => (
    <footer className="border-t border-border bg-background/80 py-8 mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm max-w-7xl w-full mx-auto px-4">
            <div className="flex items-center gap-2 font-semibold">
                <span className="inline-block w-6 h-6 rounded bg-primary text-primary-foreground flex items-center justify-center font-black text-base">F</span>
                FinanceFire
            </div>
            <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
            <div className="text-muted-foreground">&copy; {new Date().getFullYear()} FinanceFire. All rights reserved.</div>
        </div>
    </footer>
)

export default Footer
