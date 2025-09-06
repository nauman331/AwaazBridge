import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, userdata } = useSelector((state: any) => state.auth);

    const publicRoutes = ["/login", "/signup", "/forgot-password", "/verify-otp", "/reset-password"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    useEffect(() => {
        if (token && isPublicRoute) {
            toast.info("You are already authenticated. Redirecting to your profile.");
            const role = userdata?.role;
            if (role === "Admin" && !location.pathname.includes("/admin")) {
                navigate("/admin", { replace: true });
            } else if (role === "Student" && !location.pathname.includes("/student")) {
                navigate("/student", { replace: true });
            } else if (role === "Teacher" && !location.pathname.includes("/teacher")) {
                navigate("/teacher", { replace: true });
            }
            return;
        }

        // Check if user is trying to access protected route without authentication
        if (!token && (location.pathname.includes("/user") || location.pathname.includes("/moderator") || location.pathname.includes("/admin"))) {
            toast.error("Please login to access this page.");
            navigate("/login", { replace: true });
            return;
        }

        // Check role-based access based on current path
        if (token && !isPublicRoute && userdata?.role) {
            const userRole = userdata.role;
            const currentPath = location.pathname;

            // Check if user is trying to access wrong role's routes
            if (userRole === "Admin" && (currentPath.startsWith("/user") || currentPath.startsWith("/moderator"))) {
                toast.error("Access denied. Redirecting to your dashboard.");
                navigate("/", { replace: true });
                return;
            } else if (userRole === "User" && (currentPath.startsWith("/admin") || currentPath.startsWith("/moderator"))) {
                toast.error("Access denied. Redirecting to your dashboard.");
                navigate("/", { replace: true });
                return;
            } else if (userRole === "Moderator" && (currentPath.startsWith("/admin") || currentPath.startsWith("/user"))) {
                toast.error("Access denied. Redirecting to your dashboard.");
                navigate("/", { replace: true });
                return;
            }
        }
    }, [token, userdata, location.pathname, navigate, isPublicRoute]);

    return <>{children}</>;
}

export default ProtectedRoute;