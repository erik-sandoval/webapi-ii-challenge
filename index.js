// index

const express = require("express");

const postRouter = require("./posts/postsRouter");

const server = express();

server.use(express.json());

server.use("/api/posts", postRouter);

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
