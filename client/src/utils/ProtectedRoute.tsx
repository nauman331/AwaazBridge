import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { token, userdata } = useSelector((state: any) => state.auth);

    const publicRoutes = ["/login", "/signup", "/forgot-password", "/verify-otp", "/reset-password"];
    const isPublicRoute = publicRoutes.includes(location.pathname);

    useEffect(() => {
        // If user is authenticated and trying to access public routes, redirect to dashboard
        if (token && isPublicRoute) {
            toast.info("You are already authenticated. Redirecting to your profile.");
            const role = userdata?.role;
            if (role === "Admin") {
                navigate("/admin/profile", { replace: true });
            } else if (role === "Student") {
                navigate("/student/profile", { replace: true });
            } else if (role === "Teacher") {
                navigate("/teacher/profile", { replace: true });
            }
            return;
        }

        // Role-based access control
        if (token && allowedRoles && allowedRoles.length > 0) {
            const userRole = userdata?.role;
            if (!allowedRoles.includes(userRole)) {
                toast.error("You don't have permission to access this page.");
                // Redirect to appropriate dashboard based on role
                if (userRole === "Admin") {
                    navigate("/admin/profile", { replace: true });
                } else if (userRole === "Student") {
                    navigate("/student/profile", { replace: true });
                } else if (userRole === "Teacher") {
                    navigate("/teacher/profile", { replace: true });
                } else {
                    navigate("/login", { replace: true });
                }
                return;
            }
        }
    }, [token, userdata, location.pathname, navigate, isPublicRoute, allowedRoles]);

    // Don't render children during redirects
    if ((token && isPublicRoute) || (!token && !isPublicRoute)) {
        return null;
    }

    // Role-based access control check (additional safety)
    if (allowedRoles && allowedRoles.length > 0 && token) {
        const userRole = userdata?.role;
        if (!allowedRoles.includes(userRole)) {
            return null;
        }
    }

    return <>{children}</>;
}

export default ProtectedRoute;