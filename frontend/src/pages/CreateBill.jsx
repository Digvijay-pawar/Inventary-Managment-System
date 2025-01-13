import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import ProductSearch from "../components/ProductSearch";
import Cart from "../components/Cart";
import CustomerDetails from "../components/CustomerDetails";
import BillSummary from "../components/BillSummary";
import useGetProducts from "../hooks/useGetAllProduct";
import useCreateBill from "../hooks/useCreateBill";

const CreateBill = () => {
  const { mutate: createBill } = useCreateBill();
  const { data } = useGetProducts();
  const [cart, setCart] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const resetForm = () => {
    setCart([]);
    reset();
  };

  const handleAddToCart = (product) => {
    const productExists = cart.find((item) => item._id === product._id);
    if (productExists) {
      toast.error("Product is already in the cart.");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
    setValue("search", ""); // Clear search input
  };

  const handleQuantityChange = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const onSubmit = (data) => {
    if (cart.length === 0) {
      toast.error("Please add products to the cart before submitting.");
      return;
    }

    const products = cart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    createBill({ customerDetails: data, products });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="flex space-x-5">
        <ProductSearch data={data} handleAddToCart={handleAddToCart} />
        <Cart
          cart={cart}
          handleQuantityChange={handleQuantityChange}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
      <div className="flex space-x-5">
        <CustomerDetails register={register} errors={errors} />
        <BillSummary cart={cart} />
      </div>
      <button type="submit" className="btn btn-success mt-4 w-full">
        Submit Bill
      </button>
    </form>
  );
};

export default CreateBill;
