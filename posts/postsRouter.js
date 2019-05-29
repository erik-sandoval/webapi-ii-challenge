// postRouter

const Posts = require("../data/db");

const router = require("express").Router();

// get and create a post
router.get("/", (req, res) => {
  Posts.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({ message: "error getting posts" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  if (post.title && post.contents) {
    Posts.insert(post)
      .then(data => {
        res.status(201).json({ message: "post successfully added." });
      })
      .catch(err => {
        res.status(500).json({ message: "could not add post." });
      });
  } else {
    res.status(401).json({ message: "title and content required for a post." });
  }
});
