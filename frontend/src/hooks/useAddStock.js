import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './index';
import toast from 'react-hot-toast';

const addStock = async (data) => {
    try {
        const response = await api.put('/product/add-stock', data);
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

const useAddStock = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addStock,
        onError: (error) => {
            console.log("Error object in onError:", error);
            toast.error(error.message, { duration: 5000 });
        },
        onSuccess: () => {
            queryClient.invalidateQueries('products');
            toast.success("Stock updated successfully!", { duration: 5000 });
        },
    });
};

export default useAddStock;
