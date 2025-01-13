import api from "./index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteProduct = async (ProductId) => {
    try {
        const response = await api.delete(`/Product/delete/${ProductId}`);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onError: (error) => {
            console.error("Error deleting Product:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("Products");
            toast.success("Delete product successfull!", { duration: 5000 });
        },
    });
};

export default useDeleteProduct;
