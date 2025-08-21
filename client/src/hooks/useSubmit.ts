import { backendUrl } from "@/utils/exports";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

const useSubmit = (endpoint: string, isAuth: boolean, mutationKey: string, method: string = "POST") => {
    const { token } = useSelector((state: any) => state.auth);
    const { mutate, isPending, error, data, isSuccess } = useMutation({
        mutationKey: [mutationKey],
        mutationFn: async (formData: any) => {
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...(isAuth && token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        }
    })
    return { mutate, isPending, error, data, isSuccess };
}
export default useSubmit;