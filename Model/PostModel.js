const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Corrected model name to match the actual Category model
        required: false
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
