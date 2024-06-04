import mongoose from "mongoose";

const connectdb = (url) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(url)
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));
};

export default connectdb;
