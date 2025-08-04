import * as React from "react"
import { NavLink } from "react-router-dom"
import { Mail, Facebook, Twitter, Linkedin, Instagram, MapPin, Phone } from "lucide-react"
import Logo from "./Logo"

const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about-us" },
    { name: "Contact Us", to: "/contact-us" },
    { name: "Privacy Policy", to: "/privacy-policy" },
    { name: "Terms of Service", to: "/terms-of-service" },
]

const resourcesLinks = [
    { name: "Learning Resources", to: "/resources" },
    { name: "Help Center", to: "/help" },
    { name: "Teacher Support", to: "/teacher-support" },
    { name: "Student Guide", to: "/student-guide" },
]

const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: <Facebook className="w-5 h-5" /> },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
    { name: "Instagram", href: "https://instagram.com", icon: <Instagram className="w-5 h-5" /> },
]

const Footer: React.FC = () => (
    <footer className="border-t border-border bg-background/90 pt-12 pb-6 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* About Section */}
            <div className="flex flex-col gap-3">
                <NavLink to="/" className="flex items-center font-bold text-2xl tracking-tight mb-2">
                    <Logo />
                </NavLink>
                <p className="text-muted-foreground text-sm">
                    EduFire empowers students and teachers with cutting-edge educational technology, interactive learning tools, and comprehensive course management solutions.
                </p>
                <div className="flex gap-3 mt-3">
                    {socialLinks.map(link => (
                        <a
                            key={link.name}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.name}
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
            {/* Quick Links */}
            <div>
                <h3 className="font-semibold text-base mb-3 text-primary">Quick Links</h3>
                <nav className="flex flex-col gap-2">
                    {quickLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className="hover:text-primary text-sm transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            {/* Resources */}
            <div>
                <h3 className="font-semibold text-base mb-3 text-primary">Resources</h3>
                <nav className="flex flex-col gap-2">
                    {resourcesLinks.map(link => (
                        <NavLink
                            key={link.name}
                            to={link.to}
                            className="hover:text-primary text-sm transition-colors"
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
            {/* Contact Info */}
            <div>
                <h3 className="font-semibold text-base mb-3 text-primary">Contact Us</h3>
                <ul className="text-sm flex flex-col gap-2">
                    <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        123 Education Blvd, Suite 456<br />Learning City, NY 10001
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <a href="tel:+1234567890" className="hover:text-primary transition-colors">+1 (234) 567-890</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href="mailto:support@edufire.com" className="hover:text-primary transition-colors">support@edufire.com</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-10 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-muted-foreground text-xs text-center md:text-left">
                &copy; {new Date().getFullYear()} EduFire. All rights reserved.
            </div>
            <div className="text-muted-foreground text-xs text-center md:text-right">
                Built with <span aria-label="love" role="img">❤️</span> for modern education.
            </div>
        </div>
    </footer>
)

export default Footer
