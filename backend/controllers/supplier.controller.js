const {
    findSupplierByEmail,
    deleteSupplierByEmail,
    createSupplier,
    updateSupplier,
    getSupplier,
    getAllSuppliers
} = require('../services/supplier.service');


exports.addSupplier = async (req, res) => {
    try {
        const { name, contact, address, productsSupplied } = req.body;

        if (!name || !contact || !address || !productsSupplied) {
            return res.status(400).json({ status: false, message: "All fields (name, contact, address, productsSupplied) are required." });
        }

        const supplier = await findSupplierByEmail(contact.email);
        if (supplier) {
            return res.status(409).json({ status: false, message: "A supplier with this email already exists." });
        }

        const newSupplier = await createSupplier(name, contact, address, productsSupplied);
        return res.status(201).json({ status: true, message: "Supplier added successfully.", supplier: newSupplier });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while adding the supplier.", error: error.message });
    }
};


exports.editSupplier = async (req, res) => {
    try {
        const { name, contact, address, productsSupplied } = req.body;

        if (!name || !contact || !address || !productsSupplied) {
            return res.status(400).json({ status: false, message: "All fields (name, contact, address, productsSupplied) are required." });
        }

        const supplier = await findSupplierByEmail(contact.email);
        if (!supplier) {
            return res.status(404).json({ status: false, message: "Supplier not found. Unable to update." });
        }

        const updatedSupplier = await updateSupplier(contact.email, name, contact, address, productsSupplied);
        return res.status(200).json({ status: true, message: "Supplier updated successfully.", supplier: updatedSupplier });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while updating the supplier.", error: error.message });
    }
};


exports.deleteSupplier = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ status: false, message: "Email parameter is required to delete a supplier." });
        }

        const deletedSupplier = await deleteSupplierByEmail(email);
        if (!deletedSupplier) {
            return res.status(404).json({ status: false, message: "No supplier found with the provided email." });
        }

        return res.status(200).json({ status: true, message: "Supplier deleted successfully." });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while deleting the supplier.", error: error.message });
    }
};


exports.getSupplier = async (req, res) => {
    try {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ status: false, message: "Email parameter is required to get a supplier." });
        }

        const supplier = await getSupplier(email);
        if (!supplier) {
            return res.status(404).json({ status: false, message: "No supplier found with the provided email." });
        }

        return res.status(200).json({ status: true, supplier });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while retrieving the supplier.", error: error.message });
    }
};


exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await getAllSuppliers();
        return res.status(200).json({ status: true, suppliers });
    } catch (error) {
        return res.status(500).json({ status: false, message: "An error occurred while retrieving the suppliers.", error: error.message });
    }
};

