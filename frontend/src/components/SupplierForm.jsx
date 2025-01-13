import { useState } from "react";
import { useForm } from "react-hook-form";
import useAddSupplier from "../hooks/useAddSupplier";
import Loader from "./Loader";
import useEditSupplier from "../hooks/useEditSupplier";

const SupplierForm = ({ setSelectedSupplier, isOpen, setIsModalOpen, supplier }) => {
    const isEdit = Boolean(supplier);
    const { mutate: addSupplier, status: addSuplierStatus, isError: addSuplierIsError, error: addSuplierError } = useAddSupplier();
    const { mutate: editSupplier, status: editSupplierStatus, isError: editSupplierIsError, error: editSupplierError } = useEditSupplier();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: supplier || {
            name: "",
            contact: { phone: "", email: "" },
            address: "",
            productsSupplied: [],
        },
    });

    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(supplier?.productsSupplied || []);

    const handleProductSelection = (product) => {
        const updatedProducts = selectedProducts.includes(product)
            ? selectedProducts.filter((item) => item !== product)
            : [...selectedProducts, product];

        setSelectedProducts(updatedProducts);
        setValue("productsSupplied", updatedProducts);
    };

    const onSubmit = (data) => {
        if (isEdit) {
            editSupplier(data);
            setSelectedSupplier(null);
        } else {
            addSupplier(data);
        }
        setSelectedSupplier(null)
        setIsModalOpen(false);
    };

    if (addSuplierStatus == "pending" || editSupplierStatus == 'pending') {
        return <Loader />
    }

    if (addSuplierIsError || editSupplierIsError) {
        return <p className="text-red-500 font-medium">{addSuplierError.message || editSupplierError}</p>
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isOpen ? "block" : "hidden"}`}>
            <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
                <h2 className="text-2xl font-bold mb-4">{isEdit ? "Edit Supplier" : "Add Supplier"}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Supplier Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter supplier name"
                            className="input input-bordered"
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p className="text-red-500 text-sm">Supplier name is required.</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                className="input input-bordered"
                                {...register("contact.phone", { required: true })}
                            />
                            {errors.contact?.phone && <p className="text-red-500 text-sm">Phone number is required.</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="input input-bordered"
                                {...register("contact.email", { required: true })}
                            />
                            {errors.contact?.email && <p className="text-red-500 text-sm">Email address is required.</p>}
                        </div>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <textarea
                            placeholder="Enter address"
                            className="textarea textarea-bordered"
                            {...register("address", { required: true })}
                        />
                        {errors.address && <p className="text-red-500 text-sm">Address is required.</p>}
                    </div>

                    {/* <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Products Supplied</span>
                        </label>
                        <div className="relative">
                            <div
                                onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                                className="border border-gray-300 p-2 rounded-md cursor-pointer"
                            >
                                {selectedProducts.length === 0
                                    ? "Select products"
                                    : selectedProducts.join(", ")}
                            </div>
                            {isOpenDropdown && (
                                <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10">
                                    <div className="max-h-48 overflow-y-auto">
                                        {["product1", "product2", "product3", "product4"].map((product) => (
                                            <div
                                                key={product}
                                                className={`cursor-pointer p-2 hover:bg-gray-100 ${selectedProducts.includes(product) ? "bg-blue-100" : ""
                                                    }`}
                                                onClick={() => handleProductSelection(product)}
                                            >
                                                {product}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div> */}

                    <div className="flex justify-end gap-4">
                        <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {isEdit ? "Save Changes" : "Add Supplier"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierForm;
