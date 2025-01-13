import api from "./index";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
    try {
        const response = await api.get(`/product`);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.products;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
};

export default useGetProducts;
