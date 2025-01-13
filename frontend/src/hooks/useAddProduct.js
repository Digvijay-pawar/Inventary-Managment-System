import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./index";
import toast from "react-hot-toast";

const addProduct = async (ProductData) => {
    try {
        const response = await api.post('/product/add', ProductData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.product;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useAddProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProduct,
        onError: (error) => {
            console.error("Error adding Product:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            toast.success("New product added!", { duration: 5000 });
        },
    });
};

export default useAddProduct;
