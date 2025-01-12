import { useQuery } from "@tanstack/react-query";
import api from "./index";

const getProfile = async () => {
    try {
        const response = await api.get('/user/profile',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
}

const useAuth = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getProfile
    })
}

export default useAuth;