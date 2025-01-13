import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./index";
import toast from "react-hot-toast";

const addSupplier = async (supplierData) => {
    try {
        const response = await api.post('/supplier/add', supplierData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.supplier;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useAddSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addSupplier,
        onError: (error) => {
            console.error("Error adding supplier:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: (data) => {
            const key = ["suppliers"];
            queryClient.setQueryData(key, (oldData) => {
                return [...(oldData || []), data];
            });
            toast.success("Supplier added!", { duration: 5000 });
        },
    });
};

export default useAddSupplier;
