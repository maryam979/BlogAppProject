const mongoose = require('mongoose');
const Post = require('../Model/PostModel');


async function getPosts(req, res) {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getTitle(req, res) {
  try {
    // Use case-insensitive search with a regular expression
    const post = await Post.findOne({ title: { $regex: new RegExp(req.params.title, "i") } });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createPost(req, res) {
  const { title, content, author, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const post = new Post({
    title,
    content,
    author,
    category
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function searchPosts(req, res) {
  const { title } = req.query;

  try {
    const foundPosts = await Post.find({ title: { $regex: title, $options: 'i' } });
    res.json(foundPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updatePost(req, res) {
  const { title, content, author, category } = req.body;
  if (!title || !content ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function deletePost(req, res) {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function showAllPosts(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const posts = await Post.find({ category: categoryId })
      .populate('author', 'username')
      .select('title content');

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this category' });
    }

    const formattedPosts = posts.map(post => ({
      categoryName: category.name,
      postTitle: post.title,
      postDescription: post.content // Assuming 'content' field is the description of the post
    }));

    res.json(formattedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}




module.exports = { getPosts, getPostById, createPost, searchPosts, updatePost, deletePost, getTitle, showAllPosts  };
