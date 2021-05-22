import express from "express";
import config from "../config";
import Post from "../models/Post";

const router = express.Router();

router.get("/date", async (req, res) => {
  try {
    const posts = await Post.find().sort({ timestamp: +1 });
    console.log(posts)
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/count", async (req, res) => {
  try {
    const posts = await Post.find().sort({ kick_count: -1 });
    console.log(posts)
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;