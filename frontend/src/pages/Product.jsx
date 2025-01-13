import React, { useState, useMemo } from "react";
import Search from "../components/Search";
import ProductTable from "../components/ProductTable";
import useGetAllProduct from "../hooks/useGetAllProduct";
import Loader from "../components/Loader";
import ProductForm from "../components/ProductForm";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import useDeleteProduct from "../hooks/useDeleteProduct";
import useAddStock from "../hooks/useAddStock";

const Product = () => {
  const { data, isLoading, isError, error } = useGetAllProduct();
  const { mutate: deleteProduct} = useDeleteProduct();
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ProductToDelete, setProductToDelete] = useState(null);

  const filteredData = useMemo(() => {
    if (data) {
      return filteredProduct.length > 0 ? filteredProduct : data;
    }
    return [];
  }, [data, filteredProduct]);

  const handleSearch = (searchTerm) => {
    if (data) {
      if (searchTerm) {
        const filtered = data.filter(
          (Product) =>
            Product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Product.category.includes(searchTerm)
        );
        setFilteredProduct(filtered);
      } else {
        setFilteredProduct([]);
      }
    }
  };

  const handleEdit = (Product) => {
    setSelectedProduct(Product);
    setIsModalOpen(true);
  };

  const handleDelete = (Product) => {
    setProductToDelete(Product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct(ProductToDelete._id)
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const { mutate } = useAddStock();

  const handleAddStock = (productId, newStockQuantity) => {
      mutate({ _id: productId, stockQuantity: newStockQuantity });
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
        <Search onSearch={handleSearch} isSupplier={false}/>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
          Add Product
        </button>
      </div>
      <ProductTable
        setSelectedProduct={handleEdit}
        setIsModalOpen={setIsModalOpen}
        productsData={filteredData}
        onDelete={handleDelete}
        handleAddStock={handleAddStock}
      />
      {isModalOpen && (
        <ProductForm
          product={selectedProduct}
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

export default Product;