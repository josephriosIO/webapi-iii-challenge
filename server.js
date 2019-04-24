const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routes/user-router");
const postRouter = require("./routes/post-router");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  console.log(req.body);
  res.send(`
    <h2>BOOOM LOADED</h2>
    `);
});

module.exports = server;
