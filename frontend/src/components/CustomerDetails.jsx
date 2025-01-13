// CustomerDetails.js
import React from "react";

const CustomerDetails = ({ register, errors }) => (
  <div className="bg-base-100 w-1/2 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">Customer Details</h2>
    <div className="space-y-4">
      <input
        {...register("name", { required: "Name is required" })}
        type="text"
        placeholder="Name"
        className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <input
        {...register("phone", { required: "Phone is required" })}
        type="text"
        placeholder="Phone"
        className={`input input-bordered w-full ${errors.phone ? "input-error" : ""}`}
      />
      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

      <input
        {...register("email", { required: "Email is required" })}
        type="email"
        placeholder="Email"
        className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <textarea
        {...register("address", { required: "Address is required" })}
        placeholder="Address"
        className={`textarea textarea-bordered w-full ${errors.address ? "textarea-error" : ""}`}
      />
      {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
    </div>
  </div>
);

export default CustomerDetails;
