import { useQuery } from '@tanstack/react-query'
import api from '../index'

type UserData = {
    _id: string,
    name: string,
    email: string
}

type Error = {
    message: string
}

const getUser = async (): Promise<UserData> => {
    try {
        const response = await api.get('/user/profile');
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.user;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong!");
    }
}

const useGetUser = () => {
    return useQuery<UserData, Error>({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        retry: 1
    })
}

export default useGetUser;