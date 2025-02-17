var express = require("express");
var router = express.Router();
const userService = require("../services/user.service");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const users = await userService.getAll();
  return res.json(users);
});

router.get("/:id", async function (req, res, next) {
  const userId = parseInt(req.params.id);
  const user = await userService.getById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

router.post('/', async function(req,res,next) {
  const {name, email} = req.body;
  const user = await userService.create({name, email});
  return res.status(201).json(user);
});

router.put('/:id/email', async function(req,res,next) {
  const userId = parseInt(req.params.id);
  const {email} = req.body;
  const updatedUser = await userService.updateEmail(userId, {email});
  
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(updatedUser);
})

router.delete('/:id', async function(req,res,next) {
  const userId = parseInt(req.params.id);
  const user = await userService.remove(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(204).json();
})

module.exports = router;
