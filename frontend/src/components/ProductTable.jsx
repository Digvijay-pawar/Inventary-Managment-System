import useAddStock from '../hooks/useAddStock';

const ProductTable = ({
    setSelectedProduct,
    setIsModalOpen,
    productsData,
    onDelete,
    handleAddStock
}) => {

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Category</th>
                        <th className="py-3 px-6 text-left">Description</th>
                        <th className="py-3 px-6 text-left">Price</th>
                        <th className="py-3 px-6 text-left">Available Stock</th>
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productsData?.map((product) => (
                        <tr key={product._id} className="border-b">
                            <td className="py-3 px-6">{product.name}</td>
                            <td className="py-3 px-6">{product.category}</td>
                            <td className="py-3 px-6">{product.description}</td>
                            <td className="py-3 px-6">{product.price}</td>
                            <td className="py-3 text-center px-6">{product.stockQuantity}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    onClick={() => {
                                        const newStock = parseInt(
                                            prompt("Enter additional stock quantity:", "0"),
                                            10
                                        );
                                        if (!isNaN(newStock) && newStock > 0) {
                                            handleAddStock(product._id, product.stockQuantity + newStock);
                                        } else {
                                            alert("Please enter a valid number greater than 0.");
                                        }
                                    }}
                                    className="btn btn-primary mr-2"
                                >
                                    Add Stock
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setIsModalOpen(true);
                                    }}
                                    className="btn btn-primary mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(product)}
                                    className="btn btn-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
