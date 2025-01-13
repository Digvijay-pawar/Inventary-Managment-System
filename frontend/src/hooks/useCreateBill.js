import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from './index';

const createBill = async (billData) => {
    try {
        const response = await api.post('/bill/create', billData);
        if (!response.data.status) {
            throw new Error(response.data.message);
        }
        return response.data.bill;
    } catch (error) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Something went wrong, try again later.");
    }
};

const useCreateBill = () => {
    return useMutation({
        mutationFn: createBill,
        onError: (error) => {
            toast.error(error.message, { duration: 5000 });
            console.error(error);
        },
        onSuccess: (data) => {
            toast.success('Bill created successfully!', { duration: 5000 });
            console.log('Created bill:', data);
        },
    });
};

export default useCreateBill;
