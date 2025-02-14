var express = require("express");
var router = express.Router();

const users = [
  {
    id: 1,
    name: "Admin Adminoglu",
    email: "admin@example.com",
  },
  {
    id: 2,
    name: "User Useroglu",
    email: "user@example.com",
  },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.json(users);
});

router.get("/:id", function (req, res, next) {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

router.post('/', function(req,res,next) {
  const user = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    createdDate: new Date()
  };
  users.push(user);
  return res.status(201).json(user);
});

router.put('/:id', function(req,res,next) {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.name = req.body.name;
  user.email = req.body.email;
  return res.json(user);
})

router.delete('/:id', function(req,res,next) {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(users.indexOf(user), 1);
  return res.status(204).json();
})

module.exports = router;
