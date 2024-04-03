const mongoose = require('mongoose');
const Category = require('../Model/CategorieModel');
const Post = require('../Model/PostModel');

async function getCategories(req, res) {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createCategory(req, res) {
    try {
        // Extract category data from the request body
        const { name, description } = req.body;

        // Create a new category instance
        const newCategory = new Category({ name, description });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        // Respond with a 201 status code and the newly created category
        res.status(201).json(savedCategory);
    } catch (err) {
        // If an error occurs, handle it and respond with an error message
        res.status(400).json({ message: err.message });
    }
}

async function updateCategory(req, res) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getCategoryById(req, res) {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteCategory(req, res) {
    try {
        const deletedCategory = await Category.findOneAndDelete({ _id: req.params.id });
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getPosts(req, res) {
    try {
      const posts = await Post.find()
        .populate('category', 'name') // Populate category field with name from Category model
        .select('title content'); // Select title and content fields only
  
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: 'No posts found' });
      }
  
      // Map each post to include post title, content, and category name
      const formattedPosts = posts.map(post => ({
        postTitle: post.title,
        postContent: post.content,
        categoryName: post.category ? post.category.name : 'Uncategorized'
      }));
  
      res.json(formattedPosts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

module.exports = { getCategories, createCategory, updateCategory, deleteCategory, getCategoryById, getPosts };
