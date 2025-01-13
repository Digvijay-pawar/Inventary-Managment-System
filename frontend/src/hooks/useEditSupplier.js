import api from "./index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const editSupplier = async (supplierData) => {
    try {
        const response = await api.put(`/supplier/edit`, supplierData);
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

const useEditSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editSupplier,
        onError: (error) => {
            console.error("Error editing supplier:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries("suppliers");
            toast.success("Supplier data updated!", { duration: 5000 });
        },
    });
};

export default useEditSupplier;
