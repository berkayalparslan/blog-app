var express = require('express');
var router = express.Router();

const posts = [
  {
    id: 1,
    title: 'Post 1',
    content: 'Content 1'
  },
  {
    id: 2,
    title: 'Post 2',
    content: 'Content 2'
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.json(posts);
});

router.get('/:id', function(req, res, next) {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  return res.json(post);
});

router.post('/', function(req, res, next) {
  const post = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    createdDate: new Date()
  };
  posts.push(post);
  return res.status(201).json(post);
});

router.put('/:id', function(req, res, next) {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  return res.json(post);
});

module.exports = router;
