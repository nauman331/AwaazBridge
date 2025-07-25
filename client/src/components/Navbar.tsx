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
    const [menuOpen, setMenuOpen] = React.useState(false)

    React.useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    return (
        <header className="w-full border-b border-border bg-background/80 backdrop-blur z-30 sticky top-0">
            <div className="mx-auto w-full max-w-7xl px-4 flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                    <span className="inline-block w-7 h-7 rounded bg-primary text-primary-foreground flex items-center justify-center font-black text-lg">F</span>
                    <span className="sr-only sm:not-sr-only">FinanceFire</span>
                </NavLink>
                {/* Navigation */}
                <nav className="hidden md:flex gap-8 ml-8">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors px-1"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
                {/* CTA & Hamburger */}
                <div className="flex items-center gap-2">
                    {location.pathname !== "/signup" && (
                        <Button asChild className="hidden md:inline-flex font-semibold px-5 py-2 rounded-lg shadow-sm">
                            <NavLink to="/signup">Get Started</NavLink>
                        </Button>
                    )}
                    {/* Hamburger for mobile */}
                    <button
                        className="md:hidden p-2 rounded border border-border hover:bg-muted transition-colors ml-2"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? (
                            // Cross icon
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-background mx-2 mt-1 animate-fade-in">
                    <nav className="flex flex-col gap-1 py-2">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className="text-base font-medium py-2 px-3 rounded hover:bg-muted transition-colors text-muted-foreground"
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <div className="my-2" />
                        {location.pathname !== "/signup" && (
                            <Button asChild className="w-full font-semibold px-5 py-2 rounded-lg shadow-sm">
                                <NavLink to="/signup">Get Started</NavLink>
                            </Button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar
