const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  address: { type: String, required: true },
  productsSupplied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', SupplierSchema);
module.exports =  Supplier;
