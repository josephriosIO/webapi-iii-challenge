const express = require("express");

const postDb = require("../data/helpers/postDb");

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

// router.post("/", async (req, res) => {
//   try {
//     const newPost = await postDb.insert(req.body);
//     res.status(201).json(newPost);
//   } catch (err) {
//     res.status(500).json({ message: "error" });
//   }
// });

//Create a post
router.post("/", (req, res) => {
  const { text, user_id } = req.body;
  if (!text || !user_id) {
    res.status(400).json({
      errorMessage: "Please provide title and id for the post."
    });
  }
  postDb
    .insert({ text, user_id })
    .then(post => {
      res.status(201).json({ post });
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;
    const updatePost = await postDb.update(id, { text });
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await postDb.remove(id);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
