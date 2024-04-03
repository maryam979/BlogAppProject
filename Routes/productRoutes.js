const express = require('express');
const router = express.Router();
const { getProducts } = require('../Controllers/productController');

router.get('/', getProducts);

module.exports = router;
