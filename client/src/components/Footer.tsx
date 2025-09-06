import * as React from "react"
import { NavLink } from "react-router-dom"
import { Mail, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, MessageSquare } from "lucide-react"
import Logo from "./Logo"

const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about-us" },
    { name: "Contact Us", to: "/contact-us" },
    { name: "Features", to: "/#features" },
    { name: "Pricing", to: "/#pricing" },
]

const legalLinks = [
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Terms of Service", to: "/terms-of-service" },
    { name: "Forgot Password", to: "/forgot-password" },
    { name: "Sign Up", to: "/signup" },
    { name: "Sign In", to: "/login" },
]

const supportLinks = [
    { name: "Help Center", to: "/help" },
    { name: "Voice Translation Guide", to: "/guide" },
    { name: "Language Support", to: "/languages" },
    { name: "Call Quality Tips", to: "/quality-guide" },
    { name: "FAQ", to: "/#faq" },
]

const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/awazbridge", icon: <Facebook className="w-5 h-5" /> },
    { name: "Twitter", href: "https://twitter.com/awazbridge", icon: <Twitter className="w-5 h-5" /> },
    { name: "LinkedIn", href: "https://linkedin.com/company/awazbridge", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Instagram", href: "https://instagram.com/awazbridge", icon: <Instagram className="w-5 h-5" /> },
]

const Footer: React.FC = () => (
    <footer className="border-t border-border bg-background/90 pt-12 pb-6 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* About Section */}
            <div className="md:col-span-2 flex flex-col gap-3">
                <NavLink to="/" className="flex items-center font-bold text-2xl tracking-tight mb-2">
                    <Logo />
                </NavLink>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    AwazBridge connects Urdu and English speakers worldwide through real-time voice translation,
                    preserving cultural context and building meaningful communication bridges across languages.
                </p>
                <div className="flex gap-3 mt-4">
                    {socialLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="text-muted-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                {/* Contact Info */}
                <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href="tel:+923001234567" className="hover:text-primary transition-colors">
                            +92 (300) 123-4567
                        </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href="mailto:support@awazbridge.com" className="hover:text-primary transition-colors">
                            support@awazbridge.com
                        </a>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">
                            Karachi, Pakistan & New York, USA
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="font-semibold text-base mb-4 text-primary">Quick Links</h3>
                <nav className="flex flex-col gap-3">
                    {quickLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className="hover:text-primary text-sm transition-colors text-muted-foreground"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Support & Resources */}
            <div>
                <h3 className="font-semibold text-base mb-4 text-primary">Support</h3>
                <nav className="flex flex-col gap-3">
                    {supportLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className="hover:text-primary text-sm transition-colors text-muted-foreground"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Legal & Account */}
            <div>
                <h3 className="font-semibold text-base mb-4 text-primary">Legal & Account</h3>
                <nav className="flex flex-col gap-3">
                    {legalLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className="hover:text-primary text-sm transition-colors text-muted-foreground"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-10 border-t border-border pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-muted-foreground text-xs text-center md:text-left">
                    &copy; {new Date().getFullYear()} AwazBridge. All rights reserved. | Bridging voices worldwide since 2024.
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Made with ❤️ for global communication</span>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>Available in اردو & English</span>
                    </div>
                </div>
            </div>

            {/* Additional Footer Note */}
            <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                    AwazBridge is committed to breaking language barriers and connecting cultures.
                    Our platform serves users across 85+ countries with industry-leading translation accuracy.
                </p>
            </div>
        </div>
    </footer>
)

export default Footer
