import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#002B5B] dark:bg-[#002B5B] dark:text-white text-center px-4">
            <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C]">
                404
            </h1>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
                Page Not Found
            </h2>
            <p className="mt-4 max-w-md text-lg text-[#444] dark:text-[#e0e6ef]">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Button
                asChild
                size="lg"
                className="mt-8 px-8 bg-gradient-to-r from-[#FF6B00] to-[#FF9F1C] text-white border-0 shadow-lg hover:brightness-110"
            >
                <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Go Back Home
                </Link>
            </Button>
        </div>
    )
}

export default NotFound
