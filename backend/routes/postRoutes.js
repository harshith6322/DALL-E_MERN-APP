import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../mogodb/models/post.js"; // Make sure this path is correct

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.route("/").get(async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(201).json({ data: allPosts, err: false, msg: "✔️" });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ err: true, msg: "❌", error: err.message });
  }
});

// Create a new post
router.route("/").post(async (req, res) => {
  const { name, prompt, photo } = req.body;
  console.log("Received data:", name, prompt, photo);

  try {
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log("Uploaded photo URL:", photoUrl.url);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    if (!newPost) {
      return res
        .status(500)
        .json({ err: true, msg: "❌", error: "Post creation failed" });
    }

    res.status(201).json({ err: false, msg: "✔️", data: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ err: true, msg: "❌", error: error.message });
  }
});

export default router;
