const express = require("express");

const userDb = require("./helpers/userDb");

const router = express.Router();

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

module.exports = router;
