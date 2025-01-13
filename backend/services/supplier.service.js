const Supplier = require('../models/Supplier');

exports.findSupplierByEmail = async (email) => {
    return await Supplier.findOne({ "contact.email": email });
};

exports.createSupplier = async (name, contact, address, productsSupplied) => {
    const supplier = new Supplier({
        name,
        contact,
        address,
        productsSupplied,
    });
    return await supplier.save();
};

exports.updateSupplier = async (email, name, contact, address, productsSupplied) => {
    return await Supplier.findOneAndUpdate(
        { "contact.email": email },
        { name, contact, address, productsSupplied },
        { new: true }
    );
};

exports.deleteSupplierByEmail = async (email) => {
    return await Supplier.findOneAndDelete({ "contact.email": email });
};

exports.getSupplier = async (email) => {
    return await Supplier.findOne({ "contact.email": email });
};

exports.getAllSuppliers = async () => {
    return await Supplier.find();
};
