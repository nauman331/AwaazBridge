import React from "react";
import { useSelector } from "react-redux";
import { backendUrl } from "@/utils/exports";
import { toast } from "sonner"

const useSubmit = ({ url }: { url: string }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState<any | null>(null);

    const submit = async ({ method = "POST", bodyData, isAuth = false }: { method: string, bodyData: any, isAuth: boolean }) => {
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(isAuth && { "Authorization": `Bearer ${token}` }),
                },
                body: JSON.stringify(bodyData),
            });
            const responseData = await response.json();
            setData(responseData);

            if (!response.ok) {
                toast(responseData.errors[0] || responseData.message || "An error occurred");
            }

            const data = await response.json();
            console.log("Submission successful:", data);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, data };
};

export default useSubmit;