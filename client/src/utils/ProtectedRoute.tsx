import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { token } = useSelector((state: any) => state.auth);

    if (!token) {
        toast.error("You must be logged in to view this page.");
        return null;
    } else {
        toast.success("Access granted to the protected page.");
    }

    return <>{children}</>;
}
export default ProtectedRoute;