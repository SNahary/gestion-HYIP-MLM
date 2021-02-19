const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(req.body);
    res.status(400).send(error);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(t => t.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / limit);

    res.send({ users, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/users/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdate = ["name", "email", "password"];

  const isUpdateAllowed = updates.every(update =>
    allowedUpdate.includes(update)
  );

  if (!isUpdateAllowed) {
    return res.status(400).send({ error: "Your data contains ivalid key" });
  }

  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      res.status(404).send("User not found");
    }
    updates.forEach(update => (user[update] = req.body[update]));
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/:id", auth, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
