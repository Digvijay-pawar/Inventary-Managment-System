const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        enum: [
            'Electronics',
            'Clothing',
            'Groceries',
            'Home Appliances',
            'Furniture',
            'Books',
            'Toys',
            'Beauty Products',
            'Stationery',
            'Sports Equipment',
        ],
        required: true
    },
    description: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
