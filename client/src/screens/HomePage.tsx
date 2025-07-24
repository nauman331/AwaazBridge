import * as React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    FileText,
    BarChart3,
    Wallet,
    Users,
    ShieldCheck,
    Rocket,
    CheckCircle2,
    MessageCircle,
    Star,
} from "lucide-react"

const features = [
    {
        title: "Automated Invoicing",
        desc: "Send, track, and manage invoices with ease. Let FinanceFire handle the paperwork so you can focus on growth.",
        icon: <FileText className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Expense Tracking",
        desc: "Monitor spending in real-time, categorize expenses, and get actionable insights to optimize your budget.",
        icon: <Wallet className="w-8 h-8 text-[#FF9F1C]" />,
    },
    {
        title: "Smart Budgeting",
        desc: "Set budgets, get alerts, and let our AI-powered tools help you stay on track and reach your goals.",
        icon: <BarChart3 className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Team Collaboration",
        desc: "Invite your team, assign roles, and collaborate securely on all financial operations.",
        icon: <Users className="w-8 h-8 text-[#FF9F1C]" />,
    },
    {
        title: "Bank-Grade Security",
        desc: "Your data is encrypted and protected with industry-leading security standards.",
        icon: <ShieldCheck className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Fast Onboarding",
        desc: "Get started in minutes with our intuitive setup and helpful onboarding guides.",
        icon: <Rocket className="w-8 h-8 text-[#FF9F1C]" />,
    },
]

const pricingPlans = [
    {
        name: "Starter",
        price: "$0",
        period: "/mo",
        features: [
            "Unlimited invoices",
            "Basic expense tracking",
            "1 team member",
            "Email support",
        ],
        cta: "Get Started",
        highlight: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/mo",
        features: [
            "All Starter features",
            "Advanced analytics",
            "Unlimited team members",
            "Priority support",
            "Smart budgeting tools",
        ],
        cta: "Start Free Trial",
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        features: [
            "All Pro features",
            "Dedicated account manager",
            "Custom integrations",
            "Premium onboarding",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
]

const testimonials = [
    {
        name: "Sarah Lee",
        company: "Acme Corp",
        text: "FinanceFire transformed our finance workflow. The automation and insights are game-changers!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        name: "James Patel",
        company: "Startupify",
        text: "We scaled our business without worrying about manual invoicing or expense tracking. Highly recommended.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
    },
    {
        name: "Maria Gomez",
        company: "AgencyPro",
        text: "The budgeting tools and team features are perfect for agencies. Support is fast and helpful.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4,
    },
]

const faqs = [
    {
        q: "Is there a free trial?",
        a: "Yes! You can try all Pro features free for 14 days. No credit card required.",
    },
    {
        q: "Can I upgrade or downgrade anytime?",
        a: "Absolutely. You can change your plan at any time from your dashboard.",
    },
    {
        q: "Is my financial data secure?",
        a: "Yes, we use bank-grade encryption and regular security audits to keep your data safe.",
    },
    {
        q: "Do you offer support?",
        a: "Our support team is available 24/7 via email and chat for all plans.",
    },
]

const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
            <Navbar />
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-b from-[#FFF7F0] to-white dark:from-[#002B5B] dark:to-[#0a1a33] pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                    {/* Logo/Illustration */}
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <span className="mb-6">
                            {/* Inline SVG logo */}
                            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                                <defs>
                                    <linearGradient id="flame" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FF6B00" />
                                        <stop offset="1" stopColor="#FF9F1C" />
                                    </linearGradient>
                                </defs>
                                <path d="M32 8C32 8 44 20 44 32C44 41.9411 36.9411 49 27 49C17.0589 49 10 41.9411 10 32C10 20 32 8 32 8Z" fill="url(#flame)" />
                                <rect x="26" y="28" width="4" height="13" rx="2" fill="#fff" />
                                <rect x="32" y="22" width="4" height="19" rx="2" fill="#fff" />
                                <rect x="38" y="34" width="4" height="7" rx="2" fill="#fff" />
                            </svg>
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Ignite Your Finance Operations
                        </h1>
                        <p className="text-lg md:text-xl text-[#444] dark:text-[#e0e6ef] mb-8 max-w-xl">
                            Automate invoices, expenses, budgets and boost your team’s productivity with{" "}
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C]">
                                FinanceFire
                            </span>.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="px-8 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
                        >
                            <Link to="/signup">Start Free Trial</Link>
                        </Button>
                    </div>
                    {/* Illustration (optional) */}
                    <div className="flex-1 hidden md:flex justify-center">
                        {/* Placeholder for future illustration or dashboard screenshot */}
                        <div className="w-80 h-64 rounded-xl bg-gradient-to-tr from-[#FF6B00]/20 to-[#FF9F1C]/10 flex items-center justify-center border border-[#FF9F1C]/30">
                            <span className="text-2xl text-[#FF6B00] font-bold opacity-60">
                                Your Dashboard Here
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 bg-white dark:bg-[#0a1a33]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Why Choose FinanceFire?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, idx) => (
                            <div
                                key={idx}
                                className="bg-[#FFF7F0] dark:bg-[#112244] rounded-xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="font-semibold text-xl mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#444] dark:text-[#cfd8e3]">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="w-full py-12 bg-gradient-to-r from-[#FF6B00]/10 to-[#FF9F1C]/10 dark:from-[#223355] dark:to-[#112244]">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-10 h-10 text-[#FF6B00] mb-2" />
                        <span className="font-bold text-2xl">99.99% Uptime</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Reliable and always available</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <MessageCircle className="w-10 h-10 text-[#FF9F1C] mb-2" />
                        <span className="font-bold text-2xl">24/7 Support</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Real humans, real fast</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Star className="w-10 h-10 text-[#FF6B00] mb-2" />
                        <span className="font-bold text-2xl">4.9/5 Rating</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Loved by 1,000+ teams</span>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="w-full py-20 bg-[#FFF7F0] dark:bg-[#112244]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Simple, Transparent Pricing
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={plan.name}
                                className={`rounded-xl p-8 flex flex-col items-center text-center shadow-sm border transition-all ${plan.highlight
                                    ? "border-[#FF6B00] bg-gradient-to-br from-[#FF6B00]/10 to-[#FF9F1C]/10 scale-105"
                                    : "border-[#eee] dark:border-[#223355] bg-white dark:bg-[#0a1a33]"
                                    }`}
                            >
                                <h3 className="font-semibold text-xl mb-2">{plan.name}</h3>
                                <div className="text-3xl font-bold mb-2">
                                    {plan.price}
                                    <span className="text-base font-medium">{plan.period}</span>
                                </div>
                                <ul className="mb-6 text-[#444] dark:text-[#cfd8e3]">
                                    {plan.features.map((f, i) => (
                                        <li key={i} className="mb-1 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    className={`w-full ${plan.highlight
                                        ? "bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
                                        : "bg-[#002B5B] text-white dark:bg-white dark:text-[#002B5B] border-0"
                                        }`}
                                    asChild
                                    size="lg"
                                >
                                    {plan.name === "Enterprise" ? (
                                        <a href="#contact">{plan.cta}</a>
                                    ) : (
                                        <Link to="/signup">{plan.cta}</Link>
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="w-full py-20 bg-white dark:bg-[#0a1a33]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Customers Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, idx) => (
                            <div key={idx} className="rounded-xl bg-[#FFF7F0] dark:bg-[#112244] p-8 shadow-sm flex flex-col items-center text-center">
                                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 object-cover" />
                                <div className="flex gap-1 mb-2">
                                    {[...Array(t.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-[#FF9F1C] fill-[#FF9F1C]" />
                                    ))}
                                </div>
                                <p className="italic mb-4 text-[#444] dark:text-[#cfd8e3]">"{t.text}"</p>
                                <span className="font-semibold">{t.name}</span>
                                <span className="text-xs text-[#FF6B00]">{t.company}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="w-full py-20 bg-[#FFF7F0] dark:bg-[#112244]">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="rounded-lg bg-white dark:bg-[#223355] p-6 shadow flex flex-col">
                                <span className="font-semibold text-lg mb-2">{faq.q}</span>
                                <span className="text-[#444] dark:text-[#cfd8e3]">{faq.a}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="w-full py-20 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ignite Your Finances?</h2>
                    <p className="mb-8 text-lg">
                        Join 1,000+ teams using FinanceFire to automate, optimize, and grow. Start your free trial today!
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="px-8 bg-white text-[#FF6B00] font-bold border-0 shadow-lg hover:brightness-110"
                    >
                        <Link to="/signup">Start Free Trial</Link>
                    </Button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-20 bg-white dark:bg-[#0a1a33]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        About FinanceFire
                    </h2>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3] mb-4">
                        FinanceFire is a modern fintech SaaS platform built to empower
                        businesses of all sizes. Our mission is to simplify financial
                        operations, automate the boring stuff, and help you focus on what
                        matters: growth.
                    </p>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3]">
                        Trusted by startups, agencies, and enterprises worldwide, FinanceFire
                        delivers secure, scalable, and user-friendly tools for managing your
                        company’s finances.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="w-full py-20 bg-[#FFF7F0] dark:bg-[#112244]">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
                    <p className="mb-8 text-[#444] dark:text-[#cfd8e3]">
                        Have questions or want a custom demo? Reach out and our team will
                        get back to you within 1 business day.
                    </p>
                    <form className="grid gap-4 max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                            required
                        />
                        <textarea
                            placeholder="How can we help?"
                            rows={4}
                            className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white"
                            required
                        />
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
                            size="lg"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default HomePage