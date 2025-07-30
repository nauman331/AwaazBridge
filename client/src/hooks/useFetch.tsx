import React from "react";
import { useSelector } from "react-redux";
import { backendUrl } from "@/utils/exports";

const useFetch = ({ url }: { url: string }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<any | null>(null);

    const fetchData = async ({ isAuth = false }: { isAuth: boolean }) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendUrl}${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(isAuth && { "Authorization": `Bearer ${token}` }),
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const responseData = await response.json();
            setData(responseData);
        } catch (err) {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { fetchData, loading, error, data };
};

export default useFetch;