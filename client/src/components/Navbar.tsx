import * as React from "react"
import { Button } from "@/components/ui/button"
import { NavLink, useLocation } from "react-router-dom"

const navLinks = [
    { name: "Features", href: "features" },
    { name: "Pricing", href: "pricing" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
]

const Navbar: React.FC = () => {
    const location = useLocation()
    return (
        <header className="w-full border-b border-border bg-background/80 backdrop-blur z-30 sticky top-0">
            <div className="mx-auto w-full max-w-7xl px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <span className="inline-block w-7 h-7 rounded bg-primary text-primary-foreground flex items-center justify-center font-black text-lg">F</span>
                    <span className="sr-only sm:not-sr-only">FinanceFire</span>
                </NavLink>
                {/* Navigation */}
                <nav className="hidden md:flex gap-6">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                {/* CTA */}
                <div className="flex items-center gap-2">
                    {location.pathname !== "/signup" && (
                        <Button asChild className="hidden md:inline-flex">
                            <NavLink to="/signup">Get Started</NavLink>
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar
