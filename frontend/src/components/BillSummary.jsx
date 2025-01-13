// BillSummary.js
import React from "react";

const BillSummary = ({ cart }) => (
  <div className="bg-base-100 w-1/2 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Bill Summary</h2>
    <div className="space-y-2">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>{item.name} (x{item.quantity})</span>
          <span>₹{item.price * item.quantity}</span>
        </div>
      ))}
    </div>
    <div className="flex justify-between font-semibold mt-4">
      <span>Total Amount</span>
      <span>₹{cart.reduce((total, item) => total + item.price * item.quantity, 0)}</span>
    </div>
  </div>
);

export default BillSummary;
