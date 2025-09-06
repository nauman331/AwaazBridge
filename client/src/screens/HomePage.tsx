import * as React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    Video,
    Globe,
    Users,
    MessageSquare,
    Headphones,
    Mic,
    CheckCircle2,
    Star,
    Zap,
    Languages,
    ArrowLeftRight,
    Waves,

} from "lucide-react"
import DashboardImg from "../assets/Dashboard.png"
import { useSelector } from "react-redux"

const features = [
    {
        title: "Real-Time Urdu ↔ English Translation",
        desc: "Seamlessly bridge Urdu and English conversations with AI-powered voice translation. Speak naturally in your language and be understood instantly.",
        icon: <ArrowLeftRight className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Crystal Clear Voice Communication",
        desc: "HD voice quality with advanced noise cancellation ensures your message comes through perfectly, whether speaking Urdu or English.",
        icon: <Mic className="w-8 h-8 text-[#22c55e]" />,
    },
    {
        title: "Cultural Context Preservation",
        desc: "Our AI understands cultural nuances and context, preserving the meaning and emotion behind your words in both languages.",
        icon: <Globe className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Multi-Participant Conversations",
        desc: "Connect Urdu and English speakers in group calls where everyone communicates in their preferred language naturally.",
        icon: <Users className="w-8 h-8 text-[#22c55e]" />,
    },
    {
        title: "Smart Audio Processing",
        desc: "Advanced voice recognition technology specifically trained on Urdu dialects and English accents for maximum accuracy.",
        icon: <Headphones className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Bridge Building Technology",
        desc: "More than translation - we build bridges between communities, families, and cultures through seamless communication.",
        icon: <Waves className="w-8 h-8 text-[#22c55e]" />,
    },
]

const pricingPlans = [
    {
        name: "Free Bridge",
        price: "₹0",
        period: "/month",
        features: [
            "30 minutes of translation per day",
            "Urdu ↔ English voice bridging",
            "Up to 3 participants",
            "Basic audio quality",
            "Community support",
        ],
        cta: "Start Bridging Free",
        highlight: false,
    },
    {
        name: "Bridge Pro",
        price: "₹999",
        period: "/month",
        features: [
            "Unlimited translation time",
            "Advanced Urdu dialect recognition",
            "Up to 20 participants",
            "HD voice quality",
            "Call recording & transcripts",
            "Priority support",
        ],
        cta: "Upgrade to Pro",
        highlight: true,
    },
    {
        name: "Enterprise Bridge",
        price: "Custom",
        period: "",
        features: [
            "Unlimited participants",
            "Custom Urdu language models",
            "Enterprise-grade security",
            "API integration",
            "Dedicated account manager",
            "24/7 premium support",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
]

const testimonials = [
    {
        name: "Fatima Sheikh",
        company: "International Business Consultant",
        text: "AwazBridge made it possible for me to communicate with my English-speaking clients while expressing complex ideas in Urdu. The cultural context is never lost!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        name: "Ahmed Hassan",
        company: "Software Developer",
        text: "Finally, a platform that understands Pakistani Urdu perfectly! I can now attend international meetings and speak comfortably in my native language.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
    },
    {
        name: "Sarah Johnson",
        company: "NGO Coordinator",
        text: "Working with Pakistani communities became so much easier with AwazBridge. The translation is accurate and culturally sensitive. Absolutely amazing!",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
    },
]

const faqs = [
    {
        q: "How accurate is the Urdu to English translation?",
        a: "AwazBridge achieves industry-leading 96%+ accuracy for Urdu-English translations through our proprietary AI models trained on over 100,000 hours of Pakistani dialect conversations. Our accuracy rate is continuously improving through machine learning and user feedback integration.",
    },
    {
        q: "Which Urdu dialects and regional accents are supported?",
        a: "We support all major Pakistani Urdu dialects including Karachi, Lahori, Peshawari, Multani, and standard Urdu. Our AI also recognizes Punjabi-influenced Urdu, Sindhi-influenced Urdu, and various regional accents across Pakistan and the diaspora.",
    },
    {
        q: "Is AwazBridge suitable for professional business use?",
        a: "Absolutely. Our Pro and Enterprise plans are specifically designed for business environments with features including call recording, meeting transcripts, GDPR compliance, enterprise-grade security, API integrations, and dedicated support for mission-critical communications.",
    },
    {
        q: "What is the real-time translation latency?",
        a: "AwazBridge processes and translates speech in under 1.2 seconds on average, with optimizations bringing this down to 800ms for common phrases. This ensures natural conversation flow without awkward pauses between speakers.",
    },
    {
        q: "How does AwazBridge preserve cultural context and nuances?",
        a: "Our AI is specifically trained on cultural expressions, idioms, religious terms, and context-dependent phrases. We maintain a database of cultural mappings and employ semantic understanding to preserve meaning, tone, and cultural sensitivity in translations.",
    },
    {
        q: "Can I integrate AwazBridge with existing communication platforms?",
        a: "Yes, we offer RESTful APIs and SDKs for integration with popular platforms like Zoom, Microsoft Teams, Slack, and custom applications. Our Enterprise plan includes white-label solutions and dedicated technical support for seamless integration.",
    },
    {
        q: "What security measures are in place for sensitive conversations?",
        a: "AwazBridge implements end-to-end encryption, SOC 2 Type II compliance, GDPR compliance, and zero-retention policies for sensitive data. Enterprise clients benefit from on-premise deployment options and custom security configurations.",
    },
    {
        q: "Is there a mobile app available?",
        a: "Yes, AwazBridge is available on iOS and Android with full feature parity to our web platform. The mobile app includes offline mode for basic translation and automatic cloud sync across all devices.",
    },
    {
        q: "How does billing work for team and enterprise accounts?",
        a: "We offer flexible billing options including monthly/annual subscriptions, usage-based pricing, and custom enterprise contracts. Teams can manage user access, monitor usage analytics, and receive consolidated billing with detailed reporting.",
    },
    {
        q: "What kind of customer support do you provide?",
        a: "Free users receive community support and help documentation. Pro users get priority email support with 24-hour response time. Enterprise clients receive dedicated account management, phone support, and 99.9% uptime SLA.",
    },
]

const HomePage: React.FC = () => {
    const { token } = useSelector((state: any) => state.auth)

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
            <Navbar />

            <section className="w-full bg-gradient-to-b from-[#f0f9ff] to-white dark:from-[#0f172a] dark:to-[#1e293b] pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-4">
                            <Waves className="w-8 h-8 text-[#1e40af]" />
                            <Headphones className="w-8 h-8 text-[#22c55e]" />
                            <span className="text-lg font-semibold text-[#1e40af]">Bridge Every Voice</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-center md:text-left">
                            <span className="text-[#1e40af]">اردو</span> ↔ <span className="text-[#22c55e]">English</span>
                            <br />
                            <span className="text-[#1f2937] dark:text-white">Voice Bridge</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#64748b] dark:text-[#94a3b8] mb-8 max-w-xl text-center md:text-left">
                            Break language barriers between Urdu and English speakers. Connect families, businesses, and communities with{" "}
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">
                                AwazBridge
                            </span> - where every voice finds its bridge.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Button
                                asChild
                                size="lg"
                                className="px-8 py-4 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white border-0 shadow-lg hover:brightness-110 text-lg font-semibold"
                            >
                                <Link to={token ? "/user" : "/signup"}>
                                    {token ? "Start Bridging" : "Try AwazBridge Free"}
                                </Link>
                            </Button>
                            {!token && (
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="px-8 py-4 border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white text-lg font-semibold"
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                            )}
                        </div>
                        <div className="flex items-center gap-6 mt-8 text-sm text-[#64748b] dark:text-[#94a3b8]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                                <span>96%+ Accuracy</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                                <span>Real-time Translation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                                <span>Cultural Context</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 hidden md:flex justify-center">
                        <div className="relative">
                            <img
                                src={DashboardImg}
                                alt="AwazBridge Voice Communication Dashboard"
                                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -top-4 -left-4 bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white p-3 rounded-xl shadow-lg">
                                <Languages className="w-6 h-6" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-white dark:bg-[#1e293b] p-3 rounded-xl shadow-lg">
                                <Video className="w-6 h-6 text-[#1e40af]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-20 bg-white dark:bg-[#1e293b]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">AwazBridge</span>
                        </h2>
                        <p className="text-xl text-[#64748b] dark:text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
                            Bridging cultures, connecting communities, and breaking language barriers with cutting-edge AI technology designed specifically for Urdu and English speakers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-[#1f2937] dark:text-white">Our Mission</h3>
                                <p className="text-lg text-[#64748b] dark:text-[#94a3b8] mb-6 leading-relaxed">
                                    AwazBridge was founded with a clear mission: to eliminate language barriers between Urdu and English speakers worldwide. We believe that language should never be a barrier to human connection, business opportunities, or access to information.
                                </p>
                                <p className="text-lg text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                                    Built by a diverse team of Pakistani and international engineers, linguists, and cultural experts, AwazBridge combines advanced AI with deep cultural understanding to create authentic communication experiences.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#475569] rounded-xl p-6 shadow-lg border border-[#e5e7eb] dark:border-[#64748b]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#1f2937] dark:text-white">50,000+</h4>
                                        <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Active Users Worldwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#475569] rounded-xl p-6 shadow-lg border border-[#e5e7eb] dark:border-[#64748b]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-lg flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#1f2937] dark:text-white">85+ Countries</h4>
                                        <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Global Reach & Impact</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#475569] rounded-xl p-6 shadow-lg border border-[#e5e7eb] dark:border-[#64748b]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#1f2937] dark:text-white">10M+</h4>
                                        <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Messages Translated Daily</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Enterprise Ready</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                Trusted by Fortune 500 companies, NGOs, and government organizations for critical multilingual communications.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Languages className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Cultural Intelligence</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                Beyond translation—our AI understands context, cultural nuances, and regional expressions for authentic communication.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Continuous Innovation</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                Regular updates, new features, and performance improvements driven by user feedback and cutting-edge research.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 bg-[#f8fafc] dark:bg-[#334155]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Features</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
                            Experience the future of cross-language communication with features designed specifically for Urdu and English speakers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-[#475569] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#e5e7eb] dark:border-[#64748b]">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:from-[#1e293b] dark:to-[#334155]">
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-[#1f2937] dark:text-white">{feature.title}</h3>
                                <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="w-full py-20 bg-white dark:bg-[#1e293b]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Bridge</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
                            Start free and scale as you grow. All plans include our core Urdu ↔ English voice bridging technology.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div key={index} className={`relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${plan.highlight
                                ? 'bg-gradient-to-br from-[#1e40af] to-[#1d4ed8] text-white scale-105'
                                : 'bg-white dark:bg-[#475569] border border-[#e5e7eb] dark:border-[#64748b]'
                                }`}>
                                {plan.highlight && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white px-6 py-2 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-bold mb-4 ${plan.highlight ? 'text-white' : 'text-[#1f2937] dark:text-white'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-[#1f2937] dark:text-white'}`}>
                                            {plan.price}
                                        </span>
                                        <span className={`text-lg ${plan.highlight ? 'text-blue-100' : 'text-[#64748b] dark:text-[#94a3b8]'}`}>
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle2 className={`w-5 h-5 ${plan.highlight ? 'text-green-300' : 'text-[#22c55e]'} flex-shrink-0`} />
                                            <span className={`${plan.highlight ? 'text-blue-100' : 'text-[#64748b] dark:text-[#94a3b8]'}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    asChild
                                    className={`w-full py-3 text-lg font-semibold ${plan.highlight
                                        ? 'bg-white text-[#1e40af] hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white hover:brightness-110'
                                        }`}
                                >
                                    <Link to={token ? "/user" : "/signup"}>
                                        {plan.cta}
                                    </Link>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="w-full py-20 bg-[#f8fafc] dark:bg-[#334155]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Bridge Builders</span> Say
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
                            Join thousands of satisfied users who have transformed their communication with AwazBridge.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white dark:bg-[#475569] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-[#fbbf24] fill-current" />
                                    ))}
                                </div>
                                <p className="text-[#64748b] dark:text-[#94a3b8] mb-6 leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-[#1f2937] dark:text-white">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="w-full py-20 bg-white dark:bg-[#1e293b]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Questions</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-3xl mx-auto">
                            Get answers to common questions about AwazBridge's technology, pricing, security, and integration capabilities.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <details key={index} className="bg-[#f8fafc] dark:bg-[#334155] rounded-2xl overflow-hidden group border border-[#e5e7eb] dark:border-[#64748b]">
                                <summary className="cursor-pointer p-6 hover:bg-[#f1f5f9] dark:hover:bg-[#475569] transition-colors">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-semibold text-[#1f2937] dark:text-white pr-4 leading-tight">
                                            {faq.q}
                                        </h3>
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-[#1e40af] to-[#22c55e] flex items-center justify-center mt-1">
                                            <span className="text-white text-lg font-bold group-open:rotate-45 transition-transform">+</span>
                                        </div>
                                    </div>
                                </summary>
                                <div className="px-6 pb-6 pt-0">
                                    <p className="text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <p className="text-[#64748b] dark:text-[#94a3b8] mb-4">
                            Still have questions? Our support team is here to help.
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            className="border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
                        >
                            <Link to="#contact">Contact Support</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="w-full py-20 bg-[#f8fafc] dark:bg-[#334155]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Touch</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
                            Ready to bridge your communication gaps? Contact our multilingual team for personalized assistance,
                            technical support, or to discuss enterprise solutions tailored to your needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white dark:bg-[#475569] rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-[#1f2937] dark:text-white">Contact Information</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-lg flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">General Inquiries</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">hello@awazbridge.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-lg flex items-center justify-center">
                                            <Headphones className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">Technical Support</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">support@awazbridge.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">Enterprise Sales</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">enterprise@awazbridge.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#475569] rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 text-[#1f2937] dark:text-white">Response Times</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Free Plan:</span>
                                        <span className="font-semibold text-[#1f2937] dark:text-white">48-72 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Pro Plan:</span>
                                        <span className="font-semibold text-[#1f2937] dark:text-white">24 hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Enterprise:</span>
                                        <span className="font-semibold text-[#1f2937] dark:text-white">4-6 hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-[#475569] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold mb-8 text-[#1f2937] dark:text-white">Send us a Message</h3>
                                <form className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-[#1f2937] dark:text-white mb-2">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                className="w-full rounded-xl px-4 py-3 border-2 border-[#e5e7eb] dark:border-[#64748b] focus:outline-none focus:border-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-[#1f2937] dark:text-white mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="Enter your email address"
                                                className="w-full rounded-xl px-4 py-3 border-2 border-[#e5e7eb] dark:border-[#64748b] focus:outline-none focus:border-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white transition-all"
                                                required
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="block text-sm font-semibold text-[#1f2937] dark:text-white mb-2">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            placeholder="Please provide details about your inquiry, including any specific requirements or questions you may have..."
                                            rows={6}
                                            className="w-full rounded-xl px-4 py-3 border-2 border-[#e5e7eb] dark:border-[#64748b] focus:outline-none focus:border-[#1e40af] bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="privacy-consent"
                                            className="mt-1 w-4 h-4 text-[#1e40af] border-2 border-[#e5e7eb] rounded focus:ring-[#1e40af]"
                                            required
                                        />
                                        <label htmlFor="privacy-consent" className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                                            I agree to the <Link to="/privacy" className="text-[#1e40af] hover:underline">Privacy Policy</Link> and consent to the processing of my personal data for the purpose of responding to my inquiry.
                                        </label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-[#1e40af] to-[#22c55e] text-white border-0 shadow-lg hover:brightness-110 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
                                        size="lg"
                                    >
                                        Send Message
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default HomePage
