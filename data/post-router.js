const express = require("express");

const postDb = require("./helpers/postDb");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await postDb.get();
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
    const user = await postDb.getById(id);
    if (user.length === 0) {
      res.status(400).json("id does not exist");
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json("id does not load");
  }
});

module.exports = router;
