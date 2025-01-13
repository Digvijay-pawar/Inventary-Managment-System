import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddProduct from "../hooks/useAddProduct";
import useEditProduct from "../hooks/useEditProduct";
import Loader from "./Loader";
import useGetSuppliers from "../hooks/useGetAllSuppliers";

const ProductForm = ({ isOpen, setIsModalOpen, product }) => {
    const isEdit = Boolean(product);
    const { data: suppliers = [] } = useGetSuppliers(); 

    const {
        mutate: addProduct,
        status: addProductStatus,
        isError: addProductIsError,
        error: addProductError
    } = useAddProduct();

    const {
        mutate: editProduct,
        status: editProductStatus,
        isError: editProductIsError,
        error: editProductError
    } = useEditProduct();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: product || {
            name: "",
            category: "",
            description: "",
            price: "",
            stockQuantity: 0,
            suppliers: [],
        },
    });

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedSuppliers, setSelectedSuppliers] = useState(product?.suppliers || []);

    const handleSupplierSelection = (supplierId) => {
        const updatedSuppliers = selectedSuppliers.includes(supplierId)
            ? selectedSuppliers.filter((id) => id !== supplierId)
            : [...selectedSuppliers, supplierId];

        setSelectedSuppliers(updatedSuppliers);
        setValue("suppliers", updatedSuppliers); // Update form value with supplier IDs
    };

    const onSubmit = (data) => {
        if (isEdit) {
            editProduct(data);
        } else {
            addProduct(data);
        }
        setIsModalOpen(false);
    };

    if (addProductStatus === "pending" || editProductStatus === "pending") {
        return <Loader />;
    }

    if (addProductIsError || editProductIsError) {
        return <p className="text-red-500 font-medium">{addProductError.message || editProductError.message}</p>;
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Product Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">Product name is required.</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <select
                            className="select select-bordered"
                            {...register("category", { required: true })}
                        >
                            <option value="">Select a category</option>
                            {[
                                "Electronics",
                                "Clothing",
                                "Groceries",
                                "Home Appliances",
                                "Furniture",
                                "Books",
                                "Toys",
                                "Beauty Products",
                                "Stationery",
                                "Sports Equipment",
                            ].map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">Category is required.</p>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            placeholder="Enter product description"
                            className="textarea textarea-bordered"
                            {...register("description")}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                className="input input-bordered"
                                {...register("price", { required: true, min: 0 })}
                            />
                            {errors.price && <p className="text-red-500 text-sm">Price is required and must be greater than 0.</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Stock Quantity</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Enter stock quantity"
                                className="input input-bordered"
                                {...register("stockQuantity", { min: 0 })}
                            />
                        </div>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Suppliers</span>
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                                className="border border-gray-300 p-2 rounded-md cursor-pointer"
                            >
                                {selectedSuppliers.length === 0
                                    ? "Select suppliers"
                                    : suppliers
                                          .filter((supplier) => selectedSuppliers.includes(supplier._id))
                                          .map((supplier) => supplier.name)
                                          .join(", ")}
                            </div>
                            {isOpenDropdown && (
                                <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
                                    <div className="max-h-48 overflow-y-auto">
                                        {suppliers.map((supplier) => (
                                            <div
                                                key={supplier._id}
                                                className={`cursor-pointer p-2 hover:bg-gray-100 ${
                                                    selectedSuppliers.includes(supplier._id) ? "bg-blue-100" : ""
                                                }`}
                                                onClick={() => handleSupplierSelection(supplier._id)}
                                            >
                                                {supplier.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? "Save Changes" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
