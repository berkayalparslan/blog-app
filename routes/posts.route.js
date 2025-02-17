var express = require('express');
var router = express.Router();
const Post = require('../models/post');
const postService = require('../services/post.service');


router.get('/', async function(req, res, next) {
  const posts = await postService.getAll();
  return res.json(posts);
});

router.get('/:id', async function(req, res, next) {
  const postId = parseInt(req.params.id);
  const post = await postService.getById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.json(post);
});

router.post('/', async function(req, res, next) {
  const {title, content} = req.body;
  const post = await postService.create({title, content});
  return res.status(201).json(post);
});

router.put('/:id', async function(req, res, next) {
  const postId = parseInt(req.params.id);
  const {title, description} = req.body;
  const updatedPost  = await postService.update(postId, {title, description});

  if (!updatedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.json(updatedPost);
});

router.delete('/:id', async function(req, res, next) {
  const postId = parseInt(req.params.id);
  const deletedPost = await postService.remove(postId);

  if (!deletedPost) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.status(204).json();
})

module.exports = router;
