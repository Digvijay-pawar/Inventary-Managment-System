import { useMutation } from "@tanstack/react-query";
import api from "../index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type RegisterRespose = {
    status: boolean,
    message: string,
    token: string
}

type RegisterInput = {
    name: string,
    email: string,
    password: string
}

type RegisterError = {
    message: string
}

const registerUser = async (formData: RegisterInput): Promise<RegisterRespose> => {
    try {
        const response = await api.post('/user/register', formData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong!");
    }
}

const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation<RegisterRespose, RegisterError, RegisterInput>({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(data.message, { duration: 5000 });
            localStorage.setItem('token', data.token);
            navigate('/home');
        }, onError: (error) => {
            toast.error(error.message, { duration: 5000 });
        }
    })
}

export default useSignUp;