const express = require('express');
const verifyToken = require("./verifyToken");
const router = express.Router();
const {
    getPosts,
    getPostById,
    createPost,
    searchPosts,
    deletePost,
    updatePost,
    getTitle,
    showAllPosts
} = require('../Controllers/postsController');

// GET all posts
router.get('/', getPosts);

// GET a post by ID
router.get('/:id', getPostById);

// GET a post by title
router.get('/:title', getTitle);

// POST create a new post
router.post('/', verifyToken, createPost);

// GET search posts by title
router.get('/search', verifyToken, searchPosts);

// PUT update a post
router.put('/:id', verifyToken, updatePost);

// DELETE delete a post
router.delete('/:id', deletePost);
router.get('/category/:categoryId', showAllPosts);
// GET all posts with detailed information

module.exports = router;
