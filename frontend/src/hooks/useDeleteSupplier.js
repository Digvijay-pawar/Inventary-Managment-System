import api from "./index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const deleteSupplier = async (supplierEmail) => {
    try {
        const response = await api.delete(`/supplier/delete/${supplierEmail}`);
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

const useDeleteSupplier = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteSupplier,
        onError: (error) => {
            console.error("Error deleting supplier:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: () => {
            const key = "suppliers";
            queryClient.invalidateQueries(key);
            toast.success("Delete supplier successfull!", { duration: 5000 });
        },
    });
};

export default useDeleteSupplier;
