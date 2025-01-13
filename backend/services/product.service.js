const Product = require('../models/Product');

exports.findProductById = async (id) => {
    return await Product.findById(id);
};

exports.createProduct = async (name, category, description, price, suppliers) => {
    const product = new Product({
        name,
        category,
        description,
        price,
        suppliers
    });
    return await product.save();
};

exports.updateProduct = async (_id, name, category, description, price, suppliers, stockQuantity) => {
    return await Product.findByIdAndUpdate(
        {_id},
        {name, category, description, price, suppliers, stockQuantity},
        { new: true, runValidators: true }
    );
    return updatedProduct;
};

exports.deleteProductById = async (id) => {
    return await Product.findOneAndDelete({ _id: id });
};

exports.getAllProducts = async () => {
    return await Product.find();
};
