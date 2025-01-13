// Cart.js
import React from "react";

const Cart = ({ cart, handleQuantityChange, handleRemoveFromCart }) => (
  <div className="bg-base-100 w-1/2 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Cart</h2>
    {cart.length > 0 ? (
      <div className="space-y-2">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                className="input input-bordered w-16"
              />
              <button
                type="button"
                className="btn btn-error btn-sm"
                onClick={() => handleRemoveFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No products in the cart.</p>
    )}
  </div>
);

export default Cart;
