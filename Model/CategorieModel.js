const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: String
});

const Category = mongoose.model('Category', categorySchema); // Use 'Category' as the model name

module.exports = Category;
