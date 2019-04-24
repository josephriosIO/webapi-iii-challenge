const express = require("express");

const userDb = require("../data/helpers/userDb");

const router = express.Router();

// Middleware
const nameCheck = (req, res, next) => {
  const { name } = req.body;
  if (name[0] !== name[0].toUpperCase()) {
    res.status(400).send("Please capitalize the first letter of your name");
  } else {
    next();
  }
};

router.get("/", async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json("There was an error while saving the post to the database");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userDb.getById(id);
    if (user.length === 0) {
      res.status(400).json("id does not exist");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json("id does not load");
  }
});

router.get("/posts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await userDb.getUserPosts(userId);
    if (userPosts === 0) {
      res.status(400).json("no posts for this id");
    } else {
      res.status(200).json(userPosts);
    }
  } catch (err) {
    res.status(500).json("gsg");
  }
});

router.post("/", nameCheck, async (req, res) => {
  try {
    const { name } = req.body;
    console.log({ name });
    const postUser = await userDb.insert({ name });
    res.status(201).json(postUser);
  } catch (err) {
    res.status(500).json("database errors");
  }
});

router.put("/:id", nameCheck, async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const updateUser = await userDb.update(id, { name });
    res.status(201).json({ name });
  } catch (err) {
    res.status(500).json({ message: "error on database side" });
  }
});

module.exports = router;
