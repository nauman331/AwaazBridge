import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Logo from "@/components/Logo"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import useSubmit from "@/hooks/useSubmit"

type FormData = {
    otp: string;
}

const OtpVerification: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const { mutate, isPending, error, data, isSuccess } = useSubmit('auth/verify-otp', false, 'verify-otp');
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleVerifyOtp: SubmitHandler<FormData> = async (formData) => {
        if (!email) {
            toast.error("Email not found. Please try again.");
            navigate("/signup");
            return;
        }

        mutate({
            email: email,
            otp: formData.otp,
        });
    }

    useEffect(() => {
        if (isSuccess && data) {
            toast.success("OTP verified successfully! Welcome.")
            navigate("/login");
        }
        if (error) {
            toast.error(error.message || "OTP verification failed. Please try again.");
        }
    }, [isSuccess, data, error, navigate]);

    // Redirect to signup if no email in state
    useEffect(() => {
        if (!email) {
            toast.error("No email found. Please sign up first.");
            navigate("/signup");
        }
    }, [email, navigate]);

    return (
        <div className="flex flex-col min-h-screen bg-white text-[#1f2937] dark:bg-[#0f172a] dark:text-white">
            <Navbar />
            <main className="flex flex-1 items-center justify-center py-8 px-2">
                <div className="w-full max-w-md bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#334155] rounded-2xl shadow-2xl p-8 md:p-10 border border-[#1e40af]/30 dark:border-[#22c55e]/20 flex flex-col items-center">
                    <Logo className="mb-6" />
                    <h2 className="text-3xl font-extrabold text-center text-[#1e40af] dark:text-[#22c55e] mb-2">Enter OTP</h2>
                    <p className="text-sm text-center text-[#64748b] dark:text-[#94a3b8] mb-6">
                        Enter the one-time password (OTP) sent to your email {email}.
                    </p>
                    <form onSubmit={handleSubmit(handleVerifyOtp)} className="space-y-4 w-full">
                        <Input
                            type="text"
                            placeholder={errors.otp ? errors.otp.message : "Enter OTP"}
                            style={{ border: errors.otp && "2px solid red" }}
                            {...register("otp", {
                                required: "OTP is required",
                                pattern: {
                                    value: /^\d{6}$/,
                                    message: "OTP must be 6 digits"
                                }
                            })}
                            className={`bg-white dark:bg-[#334155] text-[#1f2937] dark:text-white border border-[#1e40af]/40 dark:border-[#22c55e]/30 rounded-lg focus:ring-2 focus:ring-[#1e40af]/40 transition-all ${errors.otp ? 'placeholder:text-red-500' : ''}`}
                            maxLength={6}
                        />
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] text-white font-bold border-0 shadow-lg hover:brightness-110 rounded-lg text-base py-2"
                            size="lg"
                            disabled={isPending}
                        >
                            {isPending ? "Verifying..." : "Verify OTP"}
                        </Button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default OtpVerification;