import { useQuery } from "@tanstack/react-query";
import api from "./index";

const getProduct = async (ProductId) => {
    try {
        const response = await api.get(`/product/${ProductId}`);
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

const useGetProduct = (ProductId) => {
    return useQuery({
        queryKey: ["product", ProductId],
        queryFn: () => getProduct(ProductId),
    });
};

export default useGetProduct;
