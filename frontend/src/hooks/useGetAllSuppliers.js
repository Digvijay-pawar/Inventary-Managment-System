import api from "./index";
import { useQuery } from "@tanstack/react-query";

const getSuppliers = async () => {
    try {
        const response = await api.get(`/supplier`);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.suppliers;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useGetSuppliers = () => {
    return useQuery({
        queryKey: ["suppliers"],
        queryFn: getSuppliers,
    });
};

export default useGetSuppliers;
