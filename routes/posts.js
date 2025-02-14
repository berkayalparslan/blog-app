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

module.exports = router;
