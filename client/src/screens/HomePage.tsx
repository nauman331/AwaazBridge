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
        title: "Talk in Any Language, Be Understood by Anyone",
        desc: "Speak in your own language during video calls and everyone else hears it in their language instantly. No learning new languages or waiting for translations!",
        icon: <ArrowLeftRight className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Crystal Clear Voice Calls",
        desc: "Your voice comes through loud and clear, even with background noise. Perfect for important family calls, business meetings, or catching up with friends.",
        icon: <Mic className="w-8 h-8 text-[#22c55e]" />,
    },
    {
        title: "Understands What You Really Mean",
        desc: "Our smart technology doesn't just translate words - it understands jokes, expressions, and cultural references, so your personality shines through.",
        icon: <Globe className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Group Video Calls Made Easy",
        desc: "Have video calls with family, friends, or colleagues who speak different languages. Everyone talks naturally and understands each other perfectly.",
        icon: <Users className="w-8 h-8 text-[#22c55e]" />,
    },
    {
        title: "Works with Your Accent",
        desc: "Whether you have a strong local accent or speak softly, our technology recognizes how you speak and translates accurately every time.",
        icon: <Headphones className="w-8 h-8 text-[#1e40af]" />,
    },
    {
        title: "Bringing People Together",
        desc: "Connect with grandparents who speak a different language, do business internationally, or make friends from around the world - all without language barriers.",
        icon: <Waves className="w-8 h-8 text-[#22c55e]" />,
    },
]

const pricingPlans = [
    {
        name: "Try for Free",
        price: "₹0",
        period: "/month",
        features: [
            "30 minutes of translated calls daily",
            "5 popular languages",
            "Up to 3 people per call",
            "Good call quality",
            "Email help when needed",
        ],
        cta: "Start Free Today",
        highlight: false,
    },
    {
        name: "Premium Plan",
        price: "₹999",
        period: "/month",
        features: [
            "Unlimited translated calls",
            "50+ languages available",
            "Up to 20 people per call",
            "Best call quality",
            "Save & replay your calls",
            "Quick help when you need it",
        ],
        cta: "Go Premium",
        highlight: true,
    },
    {
        name: "Business Plan",
        price: "Custom",
        period: "",
        features: [
            "Unlimited people per call",
            "Special business features",
            "Extra security & privacy",
            "Works with your existing tools",
            "Dedicated support person",
            "24/7 help available",
        ],
        cta: "Contact Us",
        highlight: false,
    },
]

const testimonials = [
    {
        name: "Maria Rodriguez",
        company: "Small Business Owner",
        text: "I can finally talk to my international customers in Spanish while they hear everything in English! It's like magic - my business has grown so much since I started using AwazBridge.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        name: "Hiroshi Tanaka",
        company: "Remote Worker",
        text: "No more struggling in English meetings! I speak Japanese, my teammates hear English, and we all understand each other perfectly. Work is so much easier now.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
    },
    {
        name: "Sarah Johnson",
        company: "Grandmother of 6",
        text: "My grandchildren live in different countries and speak different languages. Now I can video call them and we all understand each other. It brings our family together!",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
    },
]

const faqs = [
    {
        q: "How many languages can I use with AwazBridge?",
        a: "AwazBridge works with over 50 languages including Spanish, French, German, Japanese, Chinese, Arabic, Hindi, Portuguese, and many more. We're always adding new languages based on what our users need.",
    },
    {
        q: "Will it understand my accent?",
        a: "Yes! Our technology is designed to understand different accents and ways of speaking. Whether you have a strong regional accent or speak softly, AwazBridge adapts to how you naturally talk.",
    },
    {
        q: "Can I use this for work meetings?",
        a: "Absolutely! Many people use AwazBridge for work meetings, client calls, and team discussions. Our Premium and Business plans have extra features like call recording and better security for professional use.",
    },
    {
        q: "How fast does the translation work?",
        a: "The translation happens almost instantly - usually in less than 1.5 seconds. This means conversations flow naturally without long, awkward pauses between speakers.",
    },
    {
        q: "Does it just translate words or understand meaning too?",
        a: "AwazBridge understands the real meaning behind what you say, including jokes, expressions, and cultural references. It's not just word-for-word translation - it captures what you actually mean.",
    },
    {
        q: "Can I use this with Zoom, Teams, or other video call apps?",
        a: "Yes! Our Business plan includes ways to connect AwazBridge with popular video calling apps like Zoom and Microsoft Teams. Just ask our support team for help setting it up.",
    },
    {
        q: "Is my conversation private and secure?",
        a: "Your privacy is very important to us. We use strong security measures to protect your calls, and we never store or share your personal conversations without your permission.",
    },
    {
        q: "Do you have a mobile app?",
        a: "Yes! You can download AwazBridge on your iPhone or Android phone. It works just like the website version, so you can make translated video calls from anywhere.",
    },
    {
        q: "How much does it cost for my team or business?",
        a: "We have flexible pricing for teams and businesses. You can pay monthly, yearly, or we can create a custom plan based on how much you use it. Contact us to discuss what works best for you.",
    },
    {
        q: "What if I need help or have problems?",
        a: "We're here to help! Free users can email us and we'll respond within a few days. Premium users get faster responses, and Business users get dedicated support with quick phone and email help.",
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
                            <span className="text-[#1e40af]">Live Video Calls</span>
                            <br />
                            <span className="text-[#22c55e]">🌍 Speak Any Language</span> <span className="text-[#1e40af]">↔</span> <span className="text-[#22c55e]">Understand All</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[#64748b] dark:text-[#94a3b8] mb-8 max-w-xl text-center md:text-left">
                            Talk to anyone in the world, even if you don't speak the same language. Video calls where everyone speaks their own language and understands each other perfectly.{" "}
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">
                                AwazBridge
                            </span> makes it simple.
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
                                <span>50+ Languages</span>
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
                            Connecting people who speak different languages through simple, easy-to-use video calling technology. No complicated setup, no learning required.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <div className="bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#334155] dark:to-[#475569] rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-[#1f2937] dark:text-white">Our Mission</h3>
                                <p className="text-lg text-[#64748b] dark:text-[#94a3b8] mb-6 leading-relaxed">
                                    AwazBridge was created to solve a simple problem: helping people who speak different languages talk to each other easily. We believe everyone should be able to connect with family, friends, and colleagues without worrying about language differences.
                                </p>
                                <p className="text-lg text-[#64748b] dark:text-[#94a3b8] leading-relaxed">
                                    Our team includes people from many countries who understand what it's like to struggle with language barriers. We've made AwazBridge simple to use - just start a video call and talk naturally in your own language.
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
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Works for Everyone</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                Perfect for families staying in touch, businesses working internationally, and anyone who wants to connect with people who speak different languages.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Languages className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Smart & Natural</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                Our technology understands not just words, but the real meaning behind what you say - including jokes, expressions, and cultural references.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-[#1f2937] dark:text-white">Always Getting Better</h3>
                            <p className="text-[#64748b] dark:text-[#94a3b8]">
                                We regularly improve our service based on what our users tell us, making calls clearer and translations more accurate over time.
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
                            Simple video calling that lets everyone speak their own language and understand each other perfectly.
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
                            Choose the plan that works for you. All plans let you talk in your language and be understood by others.
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
                            What People Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Saying</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl mx-auto">
                            Real stories from people who use AwazBridge to connect with family, friends, and colleagues around the world.
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
                            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#22c55e]">Questions</span>
                        </h2>
                        <p className="text-lg text-[#64748b] dark:text-[#94a3b8] max-w-3xl mx-auto">
                            Here are answers to questions people often ask about how AwazBridge works and what it can do for you.
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
                            Have more questions? We'd love to help you out.
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            className="border-2 border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
                        >
                            <Link to="#contact">Ask Us Anything</Link>
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
                            Ready to start talking with people around the world? Have questions about how it works?
                            Our friendly team is here to help you get started or answer any questions you might have.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white dark:bg-[#475569] rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-6 text-[#1f2937] dark:text-white">How to Reach Us</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#1e40af] to-[#22c55e] rounded-lg flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">General Questions</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">hello@awazbridge.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-lg flex items-center justify-center">
                                            <Headphones className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">Need Help?</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">support@awazbridge.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] rounded-lg flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#1f2937] dark:text-white">Business Plans</p>
                                            <p className="text-[#64748b] dark:text-[#94a3b8]">business@awazbridge.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#475569] rounded-2xl p-6 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 text-[#1f2937] dark:text-white">How Quickly We Respond</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Free Plan:</span>
                                        <span className="font-semibold text-[#1f2937] dark:text-white">2-3 days</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Premium Plan:</span>
                                        <span className="font-semibold text-[#1f2937] dark:text-white">Same day</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#64748b] dark:text-[#94a3b8]">Business Plan:</span>
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
                                            placeholder="Tell us how we can help you, what questions you have, or what you'd like to know about AwazBridge..."
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
                                            I agree to the <Link to="/privacy" className="text-[#1e40af] hover:underline">Privacy Policy</Link> and I'm okay with you using my information to answer my questions.
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
