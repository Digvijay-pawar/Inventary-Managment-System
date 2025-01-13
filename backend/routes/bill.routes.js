const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { createBill } = require('../controllers/bill.controller');

router
    .post('/create', authMiddleware, createBill);

module.exports =  router;
