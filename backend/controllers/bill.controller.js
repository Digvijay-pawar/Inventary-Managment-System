const Bill = require('../models/Bill');
const Product = require('../models/Product');

exports.createBill = async (req, res) => {
    try {
        const { customerDetails, products } = req.body;

        if (!customerDetails || !products || products.length === 0) {
            return res.status(400).json({ status: false, message: 'Invalid input data.' });
        }
        let totalAmount = 0;
        for(let i = 0; i < products.length; i++){
            const currProduct = await Product.findById(products[i]._id);
            totalAmount += currProduct.price*products[i].quantity
        }

        const newBill = new Bill({
            customerDetails,
            products: products.map(({ _id, quantity }) => ({
                product: _id,
                quantity,
            })),
            totalAmount,
        });

        await newBill.save();

        return res.status(201).json({ status: true, message: 'Bill created successfully!', bill: newBill });
    } catch (error) {
        console.error('Error creating bill:', error);
        res.status(500).json({ status: false, message: error.message });
    }
};
