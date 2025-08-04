import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { backendUrl } from "@/utils/exports";

const useFetch = ({ url }: { url: string }) => {
    const { token } = useSelector((state: any) => state.auth);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any | null>(null);

    const fetchData = useCallback(async ({ isAuth = false }: { isAuth?: boolean } = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${backendUrl}${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(isAuth && token && { "Authorization": `Bearer ${token}` }),
                },
            });
            const resData = await response.json();
            if (!response.ok || !resData.isOk) {
                throw new Error(resData.message || "Network response was not ok");
            }
            setData(resData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [url, token]);

    return { fetchData, loading, error, data };
};

export default useFetch;