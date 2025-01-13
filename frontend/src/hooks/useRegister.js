import { useMutation } from "@tanstack/react-query";
import api from "./index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const registerUser = async (userData) => {
    try {
        const response = await api.post('/user/register', userData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.data;
    } catch (error) {
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
            toast.error(error.message, { duration: 3000 });
        },
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            toast.success("Register Successfully!", { duration: 3000 });
            navigate("/");
        }
    })
}

export default useRegister;