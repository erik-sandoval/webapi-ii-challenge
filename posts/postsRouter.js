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
      if (data.length > 0) {
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
  comment.post_id = id;

  if (comment.text) {
    Posts.insertComment(comment)
      .then(data => {
        res.status(201).json({ message: "comment added successfully" });
      })
      .catch(err => {
        res.status(500).json({ message: "could not add comment." });
      });
  } else {
    res.status(401).json({ message: "please input text." });
  }
});

// get post object, update and delete posts.
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: "post does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "could not get post." });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  Posts.update(id, changes)
    .then(data => {
      res.status(201).json({ message: "successfully updated" });
    })
    .catch(err => {
      res.status(500).json({ message: "could not update post." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Posts.remove(id)
    .then(data => {
      res.status(200).json({ message: "successfully deleted" });
    })
    .catch(err => {
      res.status(500).json({ message: "could not delete post." });
    });
});

module.exports = router;
