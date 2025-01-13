const {
    deleteProductById,
    createProduct,
    updateProduct,
    getAllProducts,
    findProductById
} = require('../services/product.service');


exports.addProduct = async (req, res) => {
    try {
        const { name, category, description, price, suppliers} = req.body;

        if (!name || !category || !description || !price) {
            return res.status(400).json({ status: false, message: "All fields (name, category, description, price) are required." });
        }

        const newProduct = await createProduct(name, category, description, price, suppliers);
        return res.status(201).json({ status: true, message: "Product added successfully.", product: newProduct });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while adding the Product.", error: error.message });
    }
};


exports.editProduct = async (req, res) => {
    try {
        console.log(req.body);
        const { _id, name, category, description, price, suppliers, stockQuantity } = req.body;

        if (!_id || !name || !category || !description || !price) {
            return res.status(400).json({ status: false, message: "All fields (name, contact, address, productsSupplied) are required." });
        }

        const product = await findProductById(_id);
        if (!product) {
            return res.status(404).json({ status: false, message: "Product not found. Unable to update." });
        }
        console.log(product)

        const updatedProduct = await updateProduct(_id, name, category, description, price, suppliers, stockQuantity);
        return res.status(200).json({ status: true, message: "Product updated successfully.", product: updatedProduct });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while updating the Product.", error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: false, message: "id parameter is required to delete a Product." });
        }

        const deletedProduct = await deleteProductById(id);
        if (!deletedProduct) {
            return res.status(404).json({ status: false, message: "No Product found with the provided id." });
        }

        return res.status(200).json({ status: true, message: "Product deleted successfully." });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while deleting the Product.", error: error.message });
    }
};


exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ status: false, message: "Id parameter is required to get a Product." });
        }

        const product = await findProductById(id);
        if (!product) {
            return res.status(404).json({ status: false, message: "No Product found with the provided id." });
        }

        return res.status(200).json({ status: true, product });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while retrieving the Product.", error: error.message });
    }
};


exports.getAllProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        return res.status(200).json({ status: true, products });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while retrieving the Products.", error: error.message });
    }
};

exports.addStock = async (req, res) => {
  const { _id, stockQuantity } = req.body;
    console.log(req.body);
  if (!_id || !stockQuantity || stockQuantity <= 0) {
    return res.status(400).json({
      status: false,
      message: 'Invalid request. Please provide a valid id and quantity.',
    });
  }

  try {
    const product = await findProductById(_id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: 'Product not found.',
      });
    }

    product.stockQuantity = stockQuantity;
    await product.save();

    return res.status(200).json({
      status: true,
      message: 'Stock updated successfully.',
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


