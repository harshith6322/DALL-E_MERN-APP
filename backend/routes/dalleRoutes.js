import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import OpenAI from "openai";
// import Postschema from "../mogodb/models/post.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

router.route("/").get((req, res) => {
  res.send("hello from dall-e");
});
router.route("/").post(async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  try {
    const AIres = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const imgurl = AIres.data[0].b64_json;
    res.json({ photo: imgurl });
  } catch (err) {
    res.json({
      err: 400,
      msg: "try again later",
    });
    console.log(err);
  }
});

export default router;
