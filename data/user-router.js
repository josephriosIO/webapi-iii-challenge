const express = require("express");

const userDb = require("./helpers/userDb");

const router = express.Router();

// Middleware
// const nameCheck = (req, res, next) => {
//   const { name } = req.body;
//   if (name[0] !== name[0].toUpperCase()) {
//     res.status(400).send("Please capitalize the first letter of your name");
//   } else {
//     next();
//   }
// };

// const checkIfNameUppercased = (req, res, next) => {
//   const { name } = req.body;
//   if (name === name.toUpperCase(0)) {
//     next();
//   } else {
//     res.status(404).send("uppercase first letter in your name!");
//     next();
//   }
// };

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

// router.post("/", nameCheck, async (req, res) => {
//   try {
//     const user = req.body;
//
//     // const postUser = await userDb.insert(user);
//     const postUser = await userDb.insert(user);
//     res.status(201).json(postUser);
//   } catch (err) {
//     res.status(500).json("database errors");
//   }
// });

router.post("/", (req, res) => {
  console.log(req.body);

  // userDb
  //   .insert(req.body)
  //   .then(user => {
  //     res.status(201).json({ user });
  //   })
  //   .catch(error => {
  //     res.status(500).json({ error: "There was an error creating the user" });
  // });
});

router.put("/:id", (req, res) => {
  console.log(req.body);
});

module.exports = router;
