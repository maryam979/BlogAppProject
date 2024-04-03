const express = require('express');
const router = express.Router();
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getPosts
} = require('../Controllers/categorieController');

// Categories routes
router.get('/', getCategories);
router.post('/', createCategory);
router.put(':id', updateCategory);
router.delete('/:id', deleteCategory);
router.get('/:id', getCategoryById);

// Posts routes
router.get('/posts', getPosts);

module.exports = router;
