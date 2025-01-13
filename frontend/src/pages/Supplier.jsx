import React, { useState, useMemo } from "react";
import Search from '../components/Search';
import SupplierTable from "../components/SupplierTable";
import useGetSuppliers from "../hooks/useGetAllSuppliers";
import Loader from "../components/Loader";
import SupplierForm from "../components/SupplierForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import useDeleteSupplier from "../hooks/useDeleteSupplier";

const Supplier = () => {
  const { data, isLoading, isError, error } = useGetSuppliers();
  const { mutate: deleteSupplier } = useDeleteSupplier();
  const [filteredSupplier, setFilteredSupplier] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const filteredData = useMemo(() => {
    if (data) {
      return filteredSupplier.length > 0 ? filteredSupplier : data;
    }
    return [];
  }, [data, filteredSupplier]);


  const handleSearch = (searchTerm) => {
    if (data) {
      if (searchTerm) {
        const filtered = data.filter(
          (supplier) =>
            supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.contact.phone.includes(searchTerm) ||
            supplier.contact.email.includes(searchTerm)
        );
        setFilteredSupplier(filtered);
      } else {
        setFilteredSupplier([]);
      }
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleDelete = (supplier) => {
    setSupplierToDelete(supplier);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteSupplier(supplierToDelete.contact.email)
    setIsDeleteModalOpen(false);
    setSupplierToDelete(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p className="text-red-500 font-medium">{error.message}</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Search onSearch={handleSearch} isSupplier={true} />
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          Add Supplier
        </button>
      </div>
      <SupplierTable
        setSelectedSupplier={handleEdit}
        setIsModalOpen={setIsModalOpen}
        suppliersData={filteredData}
        onDelete={handleDelete}
      />
      {isModalOpen && (
        <SupplierForm
          setSelectedSupplier={setSelectedSupplier}
          supplier={selectedSupplier}
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Supplier;