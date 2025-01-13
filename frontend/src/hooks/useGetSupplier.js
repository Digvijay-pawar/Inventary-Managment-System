import { useQuery } from "@tanstack/react-query";
import api from "./index";

const getSupplier = async (supplierId) => {
    try {
        const response = await api.get(`/supplier/${supplierId}`);
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

const useGetSupplier = (supplierId) => {
    return useQuery({
        queryKey: ["supplier", supplierId],
        queryFn: () => getSupplier(supplierId),
    });
};

export default useGetSupplier;
