import { backendUrl } from "@/utils/exports";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

const useDelete = (endpoint: string, mutationKey: string) => {
    const { token } = useSelector((state: any) => state.auth);

    const { isPending, error, data, isSuccess } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: async () => {
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
    });

    return { isPending, error, data, isSuccess };
}

export default useDelete;