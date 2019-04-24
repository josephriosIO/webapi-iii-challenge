const express = require("express");
// const helmet = require("helmet");
// const morgan = require("morgan");

const userRouter = require("./data/user-router");
const postRouter = require("./data/post-router");

const server = express();

server.get("/", (req, res) => {
  res.send(`
    <h2>BOOOM LOADED</h2>
    `);
});

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
