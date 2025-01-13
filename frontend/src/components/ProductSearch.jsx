// ProductSearch.js
import React, { useState } from "react";

const ProductSearch = ({ data, handleAddToCart }) => {
  const [productSearch, setProductSearch] = useState([]);

  const handleSearch = (searchTerm) => {
    if (Array.isArray(data) && data.length > 0) {
      if (searchTerm) {
        const filtered = data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProductSearch(filtered);
      } else {
        setProductSearch([]);
      }
    }
  };

  return (
    <div className="bg-base-100 p-4 w-1/2 text-center rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search for products"
        className="input input-bordered w-full mb-4"
        onChange={(e) => handleSearch(e.target.value)}
      />
      {productSearch.length > 0 && (
        <ul className="border rounded-md bg-white shadow-md">
          {productSearch.map((product) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between"
              onClick={() => handleAddToCart(product)}
            >
              <span>{product.name}</span>
              <span>₹{product.price}</span>
              <span>Stock: {product.stockQuantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
