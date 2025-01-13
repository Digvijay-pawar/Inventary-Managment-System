import api from "./index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editProduct = async (ProductData) => {
    try {
        const response = await api.put(`/product/edit`, ProductData);
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

const useEditProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editProduct,
        onError: (error) => {
            console.error("Error editing Product:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            toast.success("Product updated!", { duration: 5000 });
        },
    });
};

export default useEditProduct;
