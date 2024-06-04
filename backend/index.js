import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./mogodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

//
dotenv.config();
//
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

const port = 5050;

app.get("/", async (req, res) => {
  res.json("hellow hii");
});

//server listen
const server = async () => {
  try {
    connectdb(process.env.MONGODB_URL);
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log("http://localhost:" + port);
  });
};
server();
