import { backendUrl } from "@/utils/exports";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

const useFetch = (endpoint: string, isAuth: boolean, querykey: string) => {
    const { token } = useSelector((state: any) => state.auth);

    const { isPending, error, data } = useQuery({
        queryKey: [querykey],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...(isAuth && token && { 'Authorization': `Bearer ${token}` })
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        },
        enabled: !isAuth || !!token, // Only run query if not auth required OR token exists
    })

    return { isPending, error, data };
}

export default useFetch;