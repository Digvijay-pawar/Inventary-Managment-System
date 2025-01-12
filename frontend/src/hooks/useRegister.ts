import { useMutation } from "@tanstack/react-query";
import api from "./index";
import { useNavigate } from "react-router-dom";

type RegisterForm = {
    name: string,
    email: string,
    password: string
}

const registerUser = async (userData: RegisterForm) => {
    try {
        const response = await api.post('/user/register', userData);
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

const useRegister = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: registerUser,
        onError: (error) => {
            console.log(error.message);
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            navigate("/");
        }
    })
}

export default useRegister;