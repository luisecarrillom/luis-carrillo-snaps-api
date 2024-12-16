const express = require("express");
const router = express.Router();
const photos = require("../data/photos.json");
const { v4: uuidv4 } = require("uuid");


router.get("/", (req, res) => {
  res.json(photos);
});


router.get("/:id", (req, res) => {
  const photo = photos.find((p) => p.id === req.params.id);
  if (photo) {
    res.json(photo);
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

router.get("/:id/comments", (req, res) => {
  const photo = photos.find((p) => p.id === req.params.id);
  if (photo) {
    res.json(photo.comments || []);
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;
  const photo = photos.find((p) => p.id === req.params.id);

  if (photo) {
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      timestamp: Date.now(),
    };
    photo.comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(404).json({ message: "Photo not found" });
  }
});

module.exports = router;
