import React from "react";
// import { useSelector } from "react-redux";
import { backendUrl } from "@/utils/exports";

const useSubmit = ({ url }: { url: string }) => {
    // const { token } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<any | null>(null);

    const submit = async ({ method = "POST", bodyData, isAuth = false }: { method: string, bodyData: any, isAuth: boolean }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendUrl}${url}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    // ...(isAuth && { "Authorization": `Bearer ${token}` }),
                },
                body: JSON.stringify(bodyData),
            });
            const responseData = await response.json();
            setData(responseData);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log("Submission successful:", data);
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, error, data };
};

export default useSubmit;