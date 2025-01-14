import { useNavigate } from "react-router-dom";
import api from "../index";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Token = {
    token: string,
    message: string,
    status: boolean
}

type LoginInput = {
    email: string,
    password: string
}

type LoginError = {
    message: string
}

const loginUser = async (userData: LoginInput): Promise<Token> => {
    try {
        const response = await api.post('/user/login', userData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong!");
    }
}

const useLogin = () => {
    const navigate = useNavigate()
    return useMutation<Token, LoginError, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            toast.success(data.message, { duration: 5000 });
            console.log(data);
            localStorage.setItem('token', data.token)
            navigate('/home');
        },
        onError: (error) => {
            toast.error(error.message, { duration: 5000 });
        }
    });
};

export default useLogin;