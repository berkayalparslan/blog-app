var express = require('express');
var router = express.Router();
const Post = require('../models/post');


router.get('/', async function(req, res, next) {
  const posts = await Post.find();
  return res.json(posts);
});

router.get('/:id', async function(req, res, next) {
  const post = await Post.findOne(post => post.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.json(post);
});

router.post('/', async function(req, res, next) {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    createdDate: new Date()
  });
  const savedPost = await newPost.save();
  return res.status(201).json(savedPost);
});

router.put('/:id', async function(req, res, next) {
  const postId = parseInt(req.params.id);
  const {title, description} = req.body;
  const updatedPost = await Post.findByIdAndUpdate(postId, {title, description}, {new: true});

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.json(updatedPost);
});

router.delete('/:id', async function(req, res, next) {
  const postId = parseInt(req.params.id);
  const deletedPost = await Post.findByIdAndDelete(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(204).json();
})

module.exports = router;
