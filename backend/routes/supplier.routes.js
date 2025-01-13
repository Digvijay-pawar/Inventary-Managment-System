const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { addSupplier, editSupplier, deleteSupplier, getSupplier, getAllSuppliers } = require('../controllers/supplier.controller');


router
    .post('/add', authMiddleware, addSupplier)
    .put('/edit', authMiddleware, editSupplier)
    .delete('/delete/:email', authMiddleware, deleteSupplier)
    .get('/:email',authMiddleware, getSupplier)
    .get('/', authMiddleware, getAllSuppliers)

module.exports = router;