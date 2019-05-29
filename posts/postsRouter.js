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

// create a comment under a post id or view comments of a post id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Posts.findCommentById(id)
    .then(data => {
      console.log(data.length > 0);
      if (data.length > 0) {
        console.log(data);
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "comment does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "could not get comment." });
    });
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  if (comment.text) {
    Posts.insertComment(comment)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).json({ message: "could not add comment." });
      });
  } else {
    res.status(401).json({ message: "please input text." });
  }
});
