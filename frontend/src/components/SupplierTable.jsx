const SupplierTable = ({
  setSelectedSupplier,
  setIsModalOpen,
  suppliersData,
  onDelete,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Address</th>
            <th className="py-3 px-6 text-left">Products Supplied</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliersData?.map((supplier) => (
            <tr key={supplier._id} className="border-b">
              <td className="py-3 px-6">{supplier.name}</td>
              <td className="py-3 px-6">{supplier.contact.email}</td>
              <td className="py-3 px-6">{supplier.contact.phone}</td>
              <td className="py-3 px-6">{supplier.address}</td>
              <td className="py-3 px-6">
                {supplier.productsSupplied.join(", ")}
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => {
                    setSelectedSupplier(supplier);
                    setIsModalOpen(true);
                  }}
                  className="btn btn-primary mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(supplier)}
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

export default SupplierTable;