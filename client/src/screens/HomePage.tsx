import * as React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
    BookOpen,
    Video,
    Users,
    MessageSquare,
    GraduationCap,
    Calendar,
    CheckCircle2,
    Star,
    Clock,
} from "lucide-react"
import DashboardImg from "../assets/Dashboard.png"
import { useSelector } from "react-redux"

const features = [
    {
        title: "Interactive Online Classes",
        desc: "Conduct live classes with video conferencing, screen sharing, and interactive whiteboards for engaging learning experiences.",
        icon: <Video className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Course Management",
        desc: "Create, organize, and manage courses with assignments, quizzes, and learning materials in one centralized platform.",
        icon: <BookOpen className="w-8 h-8 text-[#FF9F1C]" />,
    },
    {
        title: "Student Progress Tracking",
        desc: "Monitor student performance with detailed analytics, grade tracking, and personalized learning insights.",
        icon: <GraduationCap className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Communication Hub",
        desc: "Connect teachers and students through real-time messaging, discussion forums, and announcement systems.",
        icon: <MessageSquare className="w-8 h-8 text-[#FF9F1C]" />,
    },
    {
        title: "Class Scheduling",
        desc: "Efficiently schedule classes, manage timetables, and send automated reminders to students and teachers.",
        icon: <Calendar className="w-8 h-8 text-[#FF6B00]" />,
    },
    {
        title: "Collaborative Learning",
        desc: "Foster teamwork with group projects, peer-to-peer learning, and collaborative study spaces.",
        icon: <Users className="w-8 h-8 text-[#FF9F1C]" />,
    },
]

const pricingPlans = [
    {
        name: "Student",
        price: "Free",
        period: "",
        features: [
            "Access to enrolled courses",
            "Join live classes",
            "Submit assignments",
            "Chat with teachers",
            "Basic progress tracking",
        ],
        cta: "Sign Up as Student",
        highlight: false,
    },
    {
        name: "Teacher",
        price: "$19",
        period: "/mo",
        features: [
            "Create unlimited courses",
            "Host live classes",
            "Advanced analytics",
            "Grade management",
            "Student communication tools",
            "Assignment creation",
        ],
        cta: "Start Teaching Today",
        highlight: true,
    },
    {
        name: "Institution",
        price: "Custom",
        period: "",
        features: [
            "All Teacher features",
            "Multi-teacher management",
            "Custom branding",
            "Advanced reporting",
            "Priority support",
            "SSO integration",
        ],
        cta: "Contact Sales",
        highlight: false,
    },
]

const testimonials = [
    {
        name: "Sarah Johnson",
        company: "Mathematics Teacher",
        text: "EduFire revolutionized my online teaching. Students are more engaged and my class management is so much easier!",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        name: "David Chen",
        company: "Computer Science Student",
        text: "The interactive features and seamless video classes make learning from home feel just like being in a real classroom.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
    },
    {
        name: "Dr. Emily Rodriguez",
        company: "University Professor",
        text: "Perfect platform for hybrid learning. The analytics help me understand each student's progress better than ever.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
    },
]

const faqs = [
    {
        q: "Is EduFire suitable for all education levels?",
        a: "Yes! EduFire works great for K-12, higher education, professional training, and corporate learning programs.",
    },
    {
        q: "Can I use EduFire for free?",
        a: "Students can join and access courses for free. Teachers get a 14-day free trial of all premium features.",
    },
    {
        q: "How many students can join a live class?",
        a: "Our platform supports up to 1000 students in a single live class with optimal performance.",
    },
    {
        q: "Is technical support available?",
        a: "Yes, we provide 24/7 technical support for all users, with priority support for paid plans.",
    },
]

const HomePage: React.FC = () => {
    const { token } = useSelector((state: any) => state.auth)

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white">
            <Navbar />
            {/* Hero Section */}
            <section className="w-full bg-gradient-to-b from-[#FFF7F0] to-white dark:from-[#002B5B] dark:to-[#0a1a33] pt-16 pb-24">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            Ignite Your Learning Journey
                        </h1>
                        <p className="text-lg md:text-xl text-[#444] dark:text-[#e0e6ef] mb-8 max-w-xl">
                            Transform education with interactive online classes, seamless communication, and powerful learning tools. Welcome to{" "}
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C]">
                                EduFire
                            </span>.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="px-8 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
                            >
                                <Link to={token ? "/dashboard" : "/signup"}>{token ? "Go to Dashboard" : "Start Learning Free"}</Link>
                            </Button>
                            {!token && (
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="px-8 border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
                                >
                                    <Link to="/login">Sign In</Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 hidden md:flex justify-center">
                        <img src={DashboardImg} alt="EduFire Learning Dashboard" className="w-full h-full object-cover rounded-xl" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="w-full py-20 bg-white dark:bg-[#0a1a33]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Everything You Need for Modern Education
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

            {/* Stats Section */}
            <section className="w-full py-12 bg-gradient-to-r from-[#FF6B00]/10 to-[#FF9F1C]/10 dark:from-[#223355] dark:to-[#112244]">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <GraduationCap className="w-10 h-10 text-[#FF6B00] mb-2" />
                        <span className="font-bold text-2xl">50,000+</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Active Students</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Clock className="w-10 h-10 text-[#FF9F1C] mb-2" />
                        <span className="font-bold text-2xl">10,000+</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Hours of Learning</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Star className="w-10 h-10 text-[#FF6B00] mb-2" />
                        <span className="font-bold text-2xl">4.9/5</span>
                        <span className="text-[#444] dark:text-[#cfd8e3]">Student Satisfaction</span>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="w-full py-20 bg-[#FFF7F0] dark:bg-[#112244]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
                        Choose Your Learning Path
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan) => (
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
                                    {plan.name === "Institution" ? (
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
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Community Says</h2>
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Education?</h2>
                    <p className="mb-8 text-lg">
                        Join thousands of students and teachers already using EduFire to create amazing learning experiences.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="px-8 bg-white text-[#FF6B00] font-bold border-0 shadow-lg hover:brightness-110"
                    >
                        <Link to={token ? "/dashboard" : "/signup"}>{token ? "Go to Dashboard" : "Get Started Today"}</Link>
                    </Button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="w-full py-20 bg-white dark:bg-[#0a1a33]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        About EduFire
                    </h2>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3] mb-4">
                        EduFire is a comprehensive educational platform designed to bridge the gap between traditional and modern learning.
                        Our mission is to make quality education accessible, interactive, and engaging for everyone.
                    </p>
                    <p className="text-lg text-[#444] dark:text-[#cfd8e3]">
                        Whether you're a student looking to enhance your learning experience or a teacher wanting to create impactful courses,
                        EduFire provides all the tools you need to succeed in the digital age.
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="w-full py-20 bg-[#FFF7F0] dark:bg-[#112244]">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
                    <p className="mb-8 text-[#444] dark:text-[#cfd8e3]">
                        Have questions about EduFire or need help getting started? Our education specialists are here to help.
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
                        <select className="rounded px-4 py-3 border border-[#FF9F1C] focus:outline-none focus:ring-2 focus:ring-[#FF6B00] bg-white dark:bg-[#223355] text-[#002B5B] dark:text-white">
                            <option value="">I am a...</option>
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="institution">Institution Representative</option>
                        </select>
                        <textarea
                            placeholder="How can we help you?"
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