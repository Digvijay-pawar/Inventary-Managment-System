const express = require('express');
const router = express.Router();
const { addProduct, editProduct, deleteProduct, getProduct, getAllProducts, addStock} = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router
    .post('/add', authMiddleware, addProduct)
    .put('/edit', authMiddleware, editProduct)
    .delete('/delete/:id', authMiddleware, deleteProduct)
    .get('/:id', authMiddleware, getProduct)
    .get('/', authMiddleware, getAllProducts)
    .put('/add-stock', authMiddleware, addStock)
module.exports = router;